# BrinkerAdvisor Rates for Claude Code

A small Claude Code plugin that connects to the public BrinkerAdvisor Rates MCP service. It contains connection metadata and documentation only: no backend source, credentials, hooks, executable dependencies, account access or background monitors.

## Install

In Claude Code:

```text
/plugin marketplace add adpadinc/brinkeradvisor-rates-claude
/plugin install brinkeradvisor-rates@brinkeradvisor
```

Review and approve the connection to `https://mcp.brinkeradvisor.com/mcp` when Claude asks. No BrinkerAdvisor login or API key is required. Claude account requirements and usage limits are separate. This repository is a publisher-managed distribution, not a claim of Anthropic review or endorsement.

For local development without a persistent installation:

```text
claude plugin validate .
claude --plugin-dir .
```

## What it does

| Tool | Purpose |
| --- | --- |
| `search` | Discover current public CD, money-market, Treasury and municipal records. Categories with no eligible records may return no results. |
| `fetch` | Retrieve complete details for one known stable record ID. |
| `compare_rates` | Compare eligible options side by side using instrument and maturity filters; never choose a winner. |
| `build_ladder` | Build an educational equal-weight maturity schedule, explicitly showing uncovered rungs. |

Try: “Find current one-year Treasury records and show their BrinkerAdvisor links.” Or: “Compare CDs and Treasuries with maturities up to 24 months and show both the BrinkerAdvisor and original-source links.”

The service's tool descriptions carry routing and citation requirements. Display every returned canonical BrinkerAdvisor link. For record details, comparisons and ladders, also display the distinct original-source links. Do not invent rates or fill gaps from memory when the service is unavailable.

## Scope and privacy

This is public information, not personalized investment, tax or suitability advice. The service does not forecast the economy, access accounts, trade, transact, or expose subscriber/private research. Do not include account numbers, credentials, personal financial details or other sensitive information in requests.

Requests go to the public HTTPS MCP endpoint. The backend uses fixed public BrinkerAdvisor rate data and privacy-safe aggregate operational counters. It does not persist prompts, raw queries, hypothetical amounts or per-user request histories in product telemetry. Because a tool invocation increments aggregate counters, its MCP `readOnlyHint` and `idempotentHint` are both false; `destructiveHint` is false. `openWorldHint` is true because the tools read a fixed public internet source. No cookies or authentication are required by BrinkerAdvisor.

- [Public rate site](https://rates.brinkeradvisor.com/)
- [Privacy policy](https://mcp.brinkeradvisor.com/privacy)
- [Service terms](https://mcp.brinkeradvisor.com/terms)
- [Support](https://mcp.brinkeradvisor.com/support)
- [Health](https://mcp.brinkeradvisor.com/health)

The remote service can be updated independently of this connector package. The backend remains private. A public repository or successful connection is not proof of acceptance into any platform's directory.

## License

The connector metadata and documentation in this repository are licensed under MIT; see [LICENSE](LICENSE). That license does not cover the separately hosted backend, rate data, third-party source content, or BrinkerAdvisor trademarks. The hosted service's terms and privacy policy remain separate.
