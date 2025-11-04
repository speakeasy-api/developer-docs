---
title: Introducing Gram 👋
description: Gram is the complete MCP cloud. Create and curate high quality agentic tools. Start with your APIs or from scratch with easy to define TypeScript functions. Deploy and host your MCP servers in minutes - secure, authenticated and ready to scale usage.
sidebar:
  order: 0
---

![Gram banner](/assets/docs/gram/img/gram.gif)

**[Gram](/product/gram)** is the complete MCP cloud. Create and curate high quality agentic tools. Deploy and host your MCP servers in minutes. Secure, complete with OAuth and ready to scale in for production usage.

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro) provides a standardized way to connect LLMs to tools and data. Gram provides a serverless and production ready platform to build and host tools as MCP servers. Source tools through existing APIs or build from scratch using TypeScript functions. Mix and match tools in toolsets and expose them as MCP servers in minutes.

```typescript filename="gram.ts"
import { Gram } from "@gram-ai/functions";
import * as z from "zod/mini";

const gram = new Gram().tool({
  name: "greet",
  description: "Greet someone special",
  inputSchema: { name: z.string() },
  async execute(ctx, input) {
    return ctx.text(`Hello, ${input.name}!`);
  },
});

export default gram;
```

Use Gram to build out MCP servers for your product, power chat expereinces in your product or surface the right data to AI agents to automate workflows.

## Why MCP?

LLMs and Agents need access to context specific data to perform useful tasks. This data is often found behind an authenticated service, in a database or stored content. [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro) is the standard protocol for defining tools that AI can use to connect to external systems where this data may live.

Since it was announced by Anthropic in November 2024, MCP has seen an unprecedented rate of adoption, quickly becoming the de facto standard. Companies like Microsoft, Google, OpenAI, and Cloudflare (among many others) have embraced it and offer MCP servers as a new way to interact with their products and APIs.

But creating, deploying, hosting, and managing the lifecycle of MCP servers remains confusing and challenging. Although MCP follows a familiar client-server model, it creates confusion about who should build, own, manage, and maintain the server. With APIs, it's always been clear. The producer (like Stripe) hosts the API, and the consumer (for example, an online shop) uses that API. With MCP, hosting models vary: Developers often "host" MCP servers on their own machines, or companies host them internally for team-wide access to internal apis or third-party integrations..

We think that companies will naturally gravitate to hosting and managing their own MCP servers, and we built Gram to make that easy.

## Why Gram?

Gram is aimed to give you a comprehensive experience and unlock the value of MCP without the need to build complete servers.

To realise this vision Gram is built with the following principles:

🔹 Simplicity: Easy to use, easy to understand, easy to maintain.

🔹 Performant and Managed: Fast and serverless infrastructure that you can rely on.

🔹 Secure: Built in security and best practices for working with agentic tools.

🔹 Works with your stack: Helps you leverage existing APIs to bootstrap tools.

Gram is made with love ❤️ and ⚒️ by the team at [Speakeasy](/company).

## LLM-Friendly Docs

This documentation site is also available in [llms.txt](https://llmstxt.org/) format, which is a simple markdown standard that LLMs can consume easily.

The `llms.txt` references two ways to access the LLM-friendly documentation:

- `llms-small.txt` is an abridged developer documentation for the site.
- `llms-full.txt` contains the entire documentation. Note this may exceed the context window of your LLM.

In addition, any page can be copied into markdown or opened into popular LLM chat clients like ChatGPT or Claude by using the drop down at the top of the right hand nav bar.

## Further Reading

- [Building tools in TypeScript using Gram Functions](/docs/gram/typescript)
- [Getting started with Gram using an API spec](/docs/gram/openapi)
- [Bring an existing MCP server to Gram](/docs/gram/gram-functions/mcp-sdk)
- [Advanced tool curation](/docs/advanced/art-of-tool-curation)
- [For resources on MCP see our MCP hub](/mcp)
- [Adding OAuth to your MCP server](/docs/gram/host-mcp/adding-oauth)
- [CLI reference](/docs/gram/command-line/installation)
