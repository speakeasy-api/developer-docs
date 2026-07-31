# Contributing to Speakeasy Documentation

Welcome to the Speakeasy documentation repository! This guide will help you contribute to our open-source documentation.

## 📂 Repository Structure

The documentation is organized into several content hubs:

- [`api-design/`](https://www.speakeasy.com/api-design) - API design guidelines and best practices
- [`docs/`](https://www.speakeasy.com/docs) - Core product documentation
- [`guides/`](https://www.speakeasy.com/guides) - Step-by-step product guides
- [`mcp/`](https://www.speakeasy.com/mcp) - MCP hub
- [`openapi/`](https://www.speakeasy.com/openapi) - OpenAPI hub
- `public/` - Shared static assets (images, downloads, etc.) served on the site

## ✍️ How to Edit Content

### 1. Locate the File

The documentation files in this repository directly map to the URLs on our website. To find the file you want to edit:

1. Take the URL path after `speakeasy.com/`
2. Add `.mdx` to the end
3. That's your file path in the repository

For example:

- Website URL: `https://www.speakeasy.com/docs/prep-openapi/linting`
  - File path: `docs/prep-openapi/linting.mdx`

### 2. Make Your Changes

- Use MDX (`.mdx`) when you need React components, or Markdown (`.md`) for simple content
- Follow our quick style guide below
- Include proper meta descriptions for SEO
- Optimize images using Next.js Image component
- Store any public/static assets in `public/`
- Update `_meta.global.tsx` to adjust sidebar ordering where needed

### 3. Submit Your Changes

1. Create a new branch for your changes
2. Commit with a descriptive message following [Conventional Commits](https://www.conventionalcommits.org/)
   - Example: `chore: update authentication guide`
3. Create a pull request
4. Once approved, your changes will be merged

## 📝 Quick Style Guide

### Writing Style

- Use clear, concise language
- Write in active voice
- Keep explanations brief and direct
- Use American English

### Code and Links

- Use code blocks for code snippets
- Add language specification to code blocks
- Use relative URLs: `[link](/docs/create-client-sdks)`
- Place code references in backticks

### Formatting

- Use sentence case for headings
- Use proper heading hierarchy
- Include code examples where relevant
- Add proper meta descriptions for SEO

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork:

   ```bash
   git clone https://github.com/YOUR_USERNAME/developer-docs.git
   ```

3. Create a new branch:

   ```bash
   git checkout -b docs/your-change
   ```

4. Make your changes
5. Submit a pull request

## 🤝 Need Help?

- Open an issue for general questions
- Join our [Slack community](https://join.slack.com/t/speakeasy-dev/shared_invite/zt-1cwb3flxz-lS5SyZxAsF_3NOq5xc8Cjw) for real-time help
- Check existing issues and pull requests for similar questions

Thank you for contributing to our documentation! Your help makes our documentation better for everyone.

## Docs MCP server

This repository doubles as the corpus for a local [Speakeasy Docs MCP](https://github.com/speakeasy-api/docs-mcp) search server running in full-text-search mode, so it requires no API keys. The build copies the five content hubs into `dist/corpus/`, renaming `.mdx` to `.md`, then indexes them.

Build the search index:

```bash
npm install
npm run docs:build
```

Run it over MCP stdio:

```bash
npm run mcp:start
```

Or run the Streamable HTTP transport on port 20310:

```bash
npm run mcp:start:http
```

The HTTP MCP endpoint is `http://localhost:20310/mcp`, and the health check is `http://localhost:20310/healthz`.

The server identifies itself as `speakeasy-docs` and exposes `speakeasy_search_docs` and `speakeasy_get_doc`. Search results can be filtered by `source` (`docs`, `guides`, `api-design`, `mcp`, or `openapi`).

For an MCP client that launches local stdio servers, use this repository as the working directory and configure:

```json
{
  "mcpServers": {
    "speakeasy-docs": {
      "command": "npm",
      "args": ["run", "--silent", "mcp:start"]
    }
  }
}
```

The generated index lives under `dist/index/` and is ignored by Git. Re-run `npm run docs:build` after content changes.

### Docker

Build and run the self-contained HTTP server:

```bash
docker build -t speakeasy-developer-docs-mcp .
docker run --rm -p 20310:20310 speakeasy-developer-docs-mcp
```

To expose the server through the Speakeasy Gram tunnel, copy the environment template, set the issued tunnel key, and start both containers:

```bash
cp .env.example .env
# Edit .env and replace gram_tunnel_replace_me with the issued key.
docker compose up --build -d
docker compose logs -f gram-tunnel
```

The Compose network routes the tunnel agent to the MCP endpoint at `http://docs-mcp:20310/mcp`; the docs server is not published on a host port. Stop and remove both containers with `docker compose down`.
