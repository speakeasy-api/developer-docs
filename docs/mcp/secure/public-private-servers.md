---
title: Control server visibility
description: Understanding Public and Private MCP Servers.
sidebar:
  order: 2
---

Gram allows you to manage settings that control how users access your Gram-hosted MCP server (public vs private) and how they authenticate with the underlying API (pass-through vs managed). These settings can be used in different combinations.

Under the **MCP Installation** section, you can edit and copy the MCP installation page and share it with others.

![Four MCP server configuration options showing combinations of public/private and passthrough/managed authentication](/assets/docs/gram/img/guides/mcp-server-four-options.png)

The MCP installation page provides a detailed guide on how to install and configure your MCP server. You can customize the installation process to fit your specific needs.

Common use cases for each combination:

- **Public + Pass-through**: Production APIs where customers already have their own API keys
- **Public + Managed**: Free trials or demos where you provide temporary access without exposing your API keys
- **Private + Pass-through**: Internal tools where team members use their individual API credentials
- **Private + Managed**: Development environments where you control both access and credentials centrally

## Public Servers

Public servers are the easiest way to use Gram and are typically what you'd use for production MCP servers. Users can connect to the MCP server with no additional authentication, and you automatically get a hosted MCP documentation page.

![Example of a Gram-hosted MCP documentation page showing available tools and endpoints](/assets/docs/gram/img/guides/gram-example-public-docs.png)

Public servers also support [MCP Managed OAuth](/docs/mcp/secure/adding-oauth-servers) for simplified authentication.

## Private Servers

Private servers restrict access to authorized users only. This is ideal for internal tools, development environments, or when control over who can discover and use the server is needed. Private servers provide complete control over access while still benefiting from Gram's hosting and management features.

Private servers support two authentication methods:

- **Gram API Keys**: Create API keys in account settings and share them with authorized users. Users provide the API key in their MCP client configuration.
- **Gram OAuth**: Use Gram as an OAuth provider where users authenticate with their Gram account credentials through a browser-based flow. Access is controlled through Gram organization membership.

### Gram OAuth

Gram OAuth provides a UI-based authentication flow as an alternative to manually distributing API keys. When enabled for a private server, users authenticate using their Gram account credentials, and access is automatically controlled through Gram organization membership.

**When to use Gram OAuth:**

- Organization-based access control is needed
- A UI-based authentication flow is preferred over manual API key distribution
- Users already have Gram accounts
- Simplified access management through organization membership is desired

**How it works:**

1. Configure Gram OAuth for the private server in the Gram dashboard
2. Users connect to the server using their MCP client
3. A browser window opens for Gram authentication
4. Users sign in with their Gram account credentials
5. Access is granted based on organization membership
6. OAuth tokens work interchangeably with Gram API keys

<!-- TODO: Add screenshot of Gram OAuth configuration in server settings -->
<!-- Path: /assets/docs/gram/img/guides/gram-oauth/configure-gram-oauth.png -->

With private servers, the documentation page cannot be made public. Access must be granted through one of the authentication methods above.

# Pass-through Authentication vs. Managed Authentication

Pass-through authentication allows users to directly provide their API credentials to access the underlying services, while managed authentication uses stored Gram environments to handle credentials centrally.

## Pass-through Authentication

In pass-through authentication a user directly passes their credentials and environment variables to the MCP Server.

If you're Acme and you want to make your TODO API available to users via Gram, but they already have an API key, they'd configure their MCP client like this to pass through their existing API key:

```
{
  "mcpServers": {
    "GramAcmetodo": {
      "command": "npx",
      "args": [
          "mcp-remote",
          "https://app.getgram.ai/mcp/ritza-rzx-todo",
          "--header",
          "MCP-TODO-API-API-KEY:sk-acmetodo-THISISSECRET"
        ]
    }
  }
}
```

Pass-through authentication can be used with both public and private Gram servers.

## Managed Authentication

Managed authentication lets you store API credentials centrally in Gram [environments](/docs/mcp/secure/environments), so users only need a Gram API key to access your server. This is perfect for demos, trials, or team scenarios where you want to provide easy access without exposing your actual API keys.

For example, you could give potential customers a temporary Gram API key to test your service. They get instant access to your tools without needing to sign up for your API or handle sensitive credentials directly. All the actual API keys and configuration stay securely stored in your Gram environment.

```
{
  "mcpServers": {
    "GramAcmetodo": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://app.getgram.ai/mcp/ritza-rzx-todo",
        "--header",
        "Gram-Environment:default",
        "--header",
        "Authorization:${GRAM_KEY}"
      ],
      "env": {
        "GRAM_KEY": "Bearer <your-gram-key>"
      }
    }
  }
}
```

The `Gram-Environment` header specifies which Gram environment to link - you can use different environments for development, staging, or production configurations.

Before using managed authentication, use the [Playground](/docs/mcp/build/toolsets/test-toolsets#_top) to ensure your environment is properly configured with all required API keys. The Playground will automatically prompt you to create any missing keys with the correct names.

You can also mix managed and pass-through authentication, using Gram environments for some credentials while letting users provide others directly.
