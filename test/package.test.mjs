import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const json = async path => JSON.parse(await readFile(new URL(path, root), "utf8"));

test("connector uses only the fixed public HTTP MCP endpoint", async () => {
  assert.deepEqual(await json(".mcp.json"), {
    mcpServers: { "brinkeradvisor-rates": { type: "http", url: "https://mcp.brinkeradvisor.com/mcp" } }
  });
});

test("package and publisher marketplace agree", async () => {
  const plugin = await json(".claude-plugin/plugin.json");
  const marketplace = await json(".claude-plugin/marketplace.json");
  assert.equal(plugin.name, "brinkeradvisor-rates");
  assert.equal(plugin.version, "1.0.0");
  assert.equal(plugin.license, "MIT");
  assert.equal(marketplace.plugins.length, 1);
  assert.equal(marketplace.plugins[0].name, plugin.name);
  assert.equal(marketplace.plugins[0].source, "./");
  assert.equal(plugin.repository, "https://github.com/adpadinc/brinkeradvisor-rates-claude");
});

test("release has no backend, hooks, dependency manifest or credentials", async () => {
  const files = (await readdir(root, { recursive: true, withFileTypes: true }))
    .filter(entry => entry.isFile())
    .map(entry => `${entry.parentPath}/${entry.name}`.replaceAll("\\", "/"))
    .filter(path => !path.includes("/.git/"));
  const allowed = ["/.mcp.json", "/.claude-plugin/plugin.json", "/.claude-plugin/marketplace.json", "/README.md", "/LICENSE", "/test/package.test.mjs"];
  assert.equal(files.length, allowed.length);
  for (const suffix of allowed) assert.equal(files.filter(path => path.endsWith(suffix)).length, 1);
});
