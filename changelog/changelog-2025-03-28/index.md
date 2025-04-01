---
title: "Add prompts to your MCP server"
description: "New features to the Speakeasy Platform - March 28, 2025"
keywords:
  [api, openapi, billing, fastapi, php]
image: "/media/changelogs/changelog-2025-03-28.png"
date: 2025-03-28
tags:
  - Agent tools
authors:
  - name: Emre Tezisci
  - image_url: "/media/author-headshots/emre.jpeg"
---

MCP is much more than an "AI-native HTTP wrapper". In addition to defining available API endpoints and operations, MCP allows you to define prompts for AI clients to use. These prompts serve as templates that AI uses to execute workflows.

Speakeasy's MCP server generator now allows you to bundle prompts with your server, combining the efficiency of a generated server with the full functionality offered by the protocol.

## How it works

When you define prompts, your generated MCP server automatically exposes `prompts/list` and `prompts/get` endpoints. These endpoints allow MCP clients to discover (`list`) and execute (`get`) prompts.
Users of the MCP client can then discover and execute these prompts directly.

The use cases for prompts are extensive. Common examples include:

- Chaining multiple API interactions
- Guiding specific workflows
- Including context from outside the API

## Getting started

Adding prompts to your server is straightforward. Define prompts in your MCP server's `/custom/customPrompts.ts` file as objects with a name, description, and prompt function.
In the description, provide instructions for the MCP client to execute, including the use of tools in your MCP server.

```typescript  /custom/customPrompts.ts
import { z } from "zod";
import { formatResult, PromptDefinition } from "../prompts.js";

// Define arguments for the link shortening workflow
const shortenLinksArgs = {
  urls: z.array(z.string()).describe("List of URLs to shorten"),
  domain: z.string().optional().describe("Optional custom domain to use")
};

export const prompt$shortenAndTrackMarketingLinks: PromptDefinition<typeof shortenLinksArgs> = {
  name: "shorten-and-track-links",
  description: "Shorten multiple URLs and set up analytics tracking",
  args: shortenLinksArgs,
  prompt: (client, args, _extra) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `
I need to create shortened links for a marketing campaign and track their performance. Please help me:

1. Create shortened links for each of these URLs: ${args.urls.join(", ")}
${args.domain ? `2. Use our custom domain: ${args.domain}` : '2. Use the default domain'}
3. Add UTM parameters for campaign tracking
4. Set up analytics to monitor clicks
5. Create a summary report of all the links

Please use the available tools to complete these tasks efficiently.
        `
      }
    }]
  })
};
```

Then register the prompt in the `server.extensions.ts` file:

```typescript
import { prompt$shortenAndTrackMarketingLinks } from "./custom/customPrompts.js";
import { Register } from "./extensions.js";

export function registerMCPExtensions(register: Register): void {
    register.prompt(prompt$shortenAndTrackMarketingLinks);
}
```
