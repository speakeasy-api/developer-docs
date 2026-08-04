---
title: Tool definitions
description: How APIs, functions, and external MCP servers become tools that agents can use
---

When a [source](/docs/ai-control-plane/reference/concepts/tool-sources) is uploaded to the platform — an OpenAPI document, a Function, or an external MCP server — a [deployment](/docs/ai-control-plane/reference/concepts/deployments) is created and processed. During processing, every operation defined in the source is converted into a corresponding tool definition. For an OpenAPI document, that's every operation in the document. For a Function, it's every tool declared in the function manifest.

![Generating tools](/assets/docs/gram/img/concepts/tool-definitions/tools-generation.png)

Tool definitions contain both the metadata needed to describe a tool to an LLM and the configuration the platform uses to execute the tool, such as how to construct the corresponding HTTP request to an API.

When building an [MCP server](/docs/ai-control-plane/distribute/mcp-servers), select the relevant tool definitions to expose, then invoke them through the Playground, the SDK, or the server itself. To build and proxy the HTTP request to the appropriate endpoint, the platform combines the tool definition with the selected [environment](/docs/ai-control-plane/distribute/environments). Each project starts with an environment named Default.

## Choosing which tools a server exposes

Giving an LLM access to too many tools can exhaust the context window, which may prevent agents from functioning properly or cause the LLM to choose the wrong tools. Some models also cap the number of tools accepted in a single chat completion call.

Start by identifying the specific task an agent should perform, then expose only the tools needed to accomplish it. A cohesive, task-focused server significantly increases the likelihood that an agent uses an API correctly. Tools from different sources can be combined on one server, so a server built to find inactive customers and email them a coupon might pair a customer lookup tool with an email tool.

Scoping servers this way also scopes access. A server built for sales exposes a different set of tools than one built for support, so each team's agents see only what's relevant to their workflows.

Two features refine this further:

- [Tool variations](/docs/ai-control-plane/reference/concepts/tool-variations) sharpen tool names and descriptions so the LLM picks the right tool.
- [Tag-based tool filtering](/docs/ai-control-plane/distribute/mcp-servers/tool-filtering) lets a client connect to a focused subset of a server's tools.

The [Playground](/docs/ai-control-plane/connect/playground) tests a selection before a real client connects to it. Send natural language prompts and watch how the LLM selects tools and handles responses.

## Tool kinds and URNs

Every tool definition is identified by a URN in the format `tools:<kind>:<source>:<name>`. The kind reflects how the tool executes:

- `http` — generated from an OpenAPI operation and executed as an HTTP request to the API
- `function` — backed by a Function
- `externalmcp` — proxied to a third-party MCP server added from the catalog or registered by URL
- `tunneledmcp` — proxied to a private MCP server connected through a tunnel
- `prompt` — a prompt template exposed as a tool
- `platform` — a built-in platform tool

Tool URNs appear in the API and SDK when selecting the tools a server exposes.
