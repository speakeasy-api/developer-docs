---
title: Dynamic toolsets
description: Enable very large MCP servers by making a toolset dynamic
---

import { Callout } from "@/mdx/components";

Dynamic toolsets enable very large MCP servers without overloading context windows. Instead of exposing all tools upfront like traditional MCP, dynamic toolsets provide "meta" tools that allow the LLM to discover only the tools it needs to complete specific tasks, optimizing token and context management.

Gram exposes two types of dynamic toolsets, both of which are experimental:

## Progressive Search

Progressive Search uses a "progressive discovery" approach to surface tools. Tools are organized into groups that the LLM can inspect to gradually discover what tools are available to it. Details of tools are only exposed when needed, for example tool schemas (which represent a large portion of tool token use) are only surfaced when the LLM decides it actually wants to use a specific tool. The toolset is compressed into three tools that actually get exposed directly to the LLM:

### `list_tools`

The LLM can discover available tools using prefix-based lookup (e.g., `list_tools(/hubspot/deals/*)`). This process is accelerated by providing the structure of available tools in the tool description, creating a hierarchy of available sources and tags. This allows the LLM full control over what tools it discovers and when.

### `describe_tools`

The LLM can look up detailed information about specific tools, including input schemas. While this could be combined with `list_tools`, the input schemas represent a significant portion of tokens, so keeping them separate optimizes token and context management at the cost of speed.

### `execute_tool`

Execute the discovered and described tools as needed for the specific task.

## Semantic Search

Semantic Search provides an embeddings-based approach to tool discovery. Embeddings are created in advance for all the tools in a toolset, then searched over to find relevant tools for a given task.

### `find_tools`

The LLM can execute semantic search over embeddings created from all tools in the toolset, allowing for more intuitive tool discovery based on natural language descriptions of what it wants to accomplish. This is generally faster than Progressive Search especially for large toolsets, but has less complete coverage and may result in worse discovery. The LLM has no insight into what tools are available broadly and can only operate off of whatever the semantic search returns.

### `execute_tool`

Execute the tools found through semantic search.

## Benefits

Both dynamic toolset approaches share the same core benefit: they avoid dumping all tools into context upfront. Instead, they expose the LLM to only the tools actually needed for a given task, making it possible to work with very large toolsets while maintaining efficient context usage.

This approach is particularly valuable when working with extensive APIs or large collections of tools where loading everything at once would exceed context limits or create unnecessary complexity.

## Enabling dynamic toolsets

Head to the `MCP` tab to switch your toolset to one of the above dynamic modes.

<Callout title="Note" type="info">
This setting only applies to MCP, and will not affect how your toolset is used in the playground.
</Callout>

![enabling dynamic toolsets](/assets/docs/gram/img/dashboard/tool-selection-mode.png)

## Additional reading

- [Code Execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp)
