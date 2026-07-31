# Speakeasy docs MCP server — design

Date: 2026-07-31
Status: Approved

## Goal

Serve this repository's documentation content through a local-first MCP search server, modeled on [`speakeasy-sdks/google-gemini-docs-mcp`](https://github.com/speakeasy-sdks/google-gemini-docs-mcp), using [Speakeasy Docs MCP](https://github.com/speakeasy-api/docs-mcp) in full-text-search mode. No terraform deployment (explicitly out of scope).

## Context

- This repository is the source of truth for Speakeasy documentation content (five hubs: `docs/`, `guides/`, `api-design/`, `mcp/`, `openapi/` — ~520 MDX/MD files). Unlike the reference repository, no upstream sync machinery is needed.
- `docs-mcp` indexes `.md` files only (`**/*.md` glob). This repository's content is `.mdx`.
- Decision (user): convert by plain rename `.mdx` → `.md` at build time into a gitignored corpus directory. Do not strip JSX or imports; the resulting noise in chunks is accepted.
- Decision (user): index all five hubs.
- Decision (user): include Dockerfile and docker compose with the Gram tunnel agent sidecar, matching the reference minus terraform.

## Components

### Corpus builder — `scripts/build-corpus.mjs`

Node script, zero dependencies. Behavior:

- Recreates `dist/corpus/` from scratch on each run (delete then rebuild, so removed source files disappear from the corpus).
- Copies the five hub directories into `dist/corpus/<hub>/`, renaming `.mdx` → `.md` and copying `.md` files as-is.
- Skips all non-markdown files (images, `.txt` assets, `.tsx`).
- Copies the repo-root `.docs-mcp.json` manifest to `dist/corpus/.docs-mcp.json`.

### Manifest — `.docs-mcp.json` (repo root, checked in)

Same schema as the reference (`docs-mcp.schema.json`, version 1):

- Chunking: `chunk_by: h2`, `max_chunk_size: 8000`, `min_chunk_size: 200`.
- Taxonomy: single facet `source` (no `vector_collapse`; the build is FTS-only). Per-hub pattern overrides assign `source` values: `docs`, `guides`, `api-design`, `mcp`, `openapi`.
- `mcpServerInstructions`: "This server provides Speakeasy documentation: core product docs (SDK generation, Gram, Terraform providers), step-by-step guides, API design best practices, the MCP hub, and the OpenAPI hub. Use speakeasy_search_docs before answering Speakeasy implementation questions, and use speakeasy_get_doc when surrounding context is needed. Filter by source to narrow results to one hub."
- The reference's `language` and `scope` facets are dropped — this corpus has no per-language SDK partition.

### Package — `package.json` (repo root, new; repo currently has none)

Private, `engines.node >= 22`. Dependencies: `@speakeasy-api/docs-mcp-cli@0.17.0`, `@speakeasy-api/docs-mcp-server@0.17.0` (latest published; matches reference). Keep the reference's `overrides: { "h3": "2.0.1-rc.18" }`.

Scripts:

| Script | Behavior |
| --- | --- |
| `corpus:build` | `node scripts/build-corpus.mjs` |
| `docs:validate` | corpus build, then `docs-mcp validate --docs-dir ./dist/corpus` |
| `docs:build` | corpus build, then `docs-mcp build --docs-dir ./dist/corpus --out ./dist/index --description "Speakeasy product, SDK, OpenAPI, and MCP documentation" --embedding-provider none --tool-description-search "Search Speakeasy documentation: product docs (SDK generation, Gram, Terraform providers), step-by-step guides, API design best practices, the MCP hub, and the OpenAPI hub. Filter by source to narrow to one hub. Use exact identifiers, CLI commands, and configuration keys."` |
| `mcp:start` | `docs-mcp-server --index-dir ./dist/index --name speakeasy-docs --tool-prefix speakeasy` (stdio) |
| `mcp:start:http` | same, plus `--transport http --port 20310 --stateless` |
| `test` | `docs:validate` then `docs:build` |

### Server identity

- Server name: `speakeasy-docs`
- Tool prefix: `speakeasy` → exposed tools `speakeasy_search_docs`, `speakeasy_get_doc`
- FTS-only (`--embedding-provider none`): no API keys, deterministic builds.
- HTTP endpoint `http://localhost:20310/mcp`; health check `http://localhost:20310/healthz`.

### Docker — `Dockerfile` + `.dockerignore`

Multi-stage, mirroring the reference:

1. `node:22-slim` deps stage: `npm ci --omit=dev`.
2. Build stage: copy the five hub directories and manifest, run corpus build, `docs-mcp validate`, `docs-mcp build` → `/index`.
3. Runtime stage: `node_modules` + `/index` only. `EXPOSE 20310`, `/healthz` HEALTHCHECK, `ENTRYPOINT docs-mcp-server` with `--transport http --port 20310 --stateless`.

### Compose — `compose.yaml` + `.env.example`

Two services on a private network, mirroring the reference:

- `docs-mcp`: built from the Dockerfile, not published on a host port, healthcheck-gated.
- `gram-tunnel`: `ghcr.io/speakeasy-api/gram-tunnel-agent:latest`, `TUNNEL_KEY` from `.env` (template value `gram_tunnel_replace_me`), `TUNNEL_LOCAL_MCP_URL=http://docs-mcp:20310/mcp`, `TUNNEL_GATEWAY_URL=wss://tunnel.speakeasy.com/connect`.

### Housekeeping

- `.gitignore` additions: `node_modules/`, `dist/`, `.env`.
- README section: local build/run, stdio MCP client config snippet, Docker and tunnel usage.

## Error handling

- `docs-mcp validate` gates every build (locally via `docs:validate`/`test`, in Docker before indexing).
- Corpus builder fails loudly if a hub directory is missing.
- Docker HEALTHCHECK polls `/healthz`; compose starts the tunnel only after the server is healthy.

## Testing

- `npm test` — full validate + index build.
- Smoke test: start the HTTP server, `curl /healthz`, issue one `speakeasy_search_docs` query over MCP and confirm results.

## Out of scope

- Terraform / Cloud Run deployment (explicit user request).
- CI workflows (reference's deploy workflow is terraform-driven; its eval harness is a separate project).
- Embeddings (FTS-only per docs-mcp README recommendation).
- Upstream sync scripts (this repository is the source of truth).

## Spec location note

The brainstorming skill default (`docs/superpowers/specs/`) would place this file inside the published `docs/` content hub and the search corpus itself. Repo-root `specs/` is used instead.
