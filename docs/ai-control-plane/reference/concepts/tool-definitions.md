---
title: Tool definitions
description: How APIs, functions, and external MCP servers become tools that agents can use
---

When a [source](/docs/ai-control-plane/reference/concepts/tool-sources) is uploaded to the platform — an OpenAPI document, a Gram Function, or an external MCP server — a [deployment](/docs/ai-control-plane/reference/concepts/deployments) is created and processed. During processing, every operation defined in the source is converted into a corresponding tool definition. For an OpenAPI document, that's every operation in the document. For a Gram Function, it's every tool declared in the function manifest.

![Generating tools](/assets/docs/gram/img/concepts/tool-definitions/tools-generation.png)

Tool definitions contain both the metadata needed to describe a tool to an LLM and the configuration the platform uses to execute the tool, such as how to construct the corresponding HTTP request to an API.

When creating [toolsets](/docs/ai-control-plane/reference/concepts/toolsets), select the relevant tool definitions to include, then invoke them through the Playground, the SDK, or an MCP server. To build and proxy the HTTP request to the appropriate endpoint, the platform combines the tool definition with the selected [environment](/docs/ai-control-plane/distribute/environments). Each project starts with an environment named Default.

## Tool kinds and URNs

Every tool definition is identified by a URN in the format `tools:<kind>:<source>:<name>`. The kind reflects how the tool executes:

- `http` — generated from an OpenAPI operation and executed as an HTTP request to the API
- `function` — backed by a Gram Function
- `externalmcp` — proxied to a third-party MCP server added from the catalog or registered by URL
- `tunneledmcp` — proxied to a private MCP server connected through a tunnel
- `prompt` — a prompt template exposed as a tool
- `platform` — a built-in platform tool

Tool URNs appear in the API and SDK when curating tools into toolsets.
