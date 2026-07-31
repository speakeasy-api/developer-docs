FROM node:22-slim AS dependencies

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM dependencies AS build

COPY .docs-mcp.json ./
COPY scripts ./scripts
COPY docs ./docs
COPY guides ./guides
COPY api-design ./api-design
COPY mcp ./mcp
COPY openapi ./openapi
RUN node scripts/build-corpus.mjs && \
    ./node_modules/.bin/docs-mcp validate --docs-dir ./dist/corpus && \
    ./node_modules/.bin/docs-mcp build \
      --docs-dir ./dist/corpus \
      --out /index \
      --description "Speakeasy product, SDK, OpenAPI, and MCP documentation" \
      --tool-description-search "Search Speakeasy documentation: product docs (SDK generation, Gram, Terraform providers), step-by-step guides, API design best practices, the MCP hub, and the OpenAPI hub. Filter by source to narrow to one hub. Use exact identifiers, CLI commands, and configuration keys." \
      --embedding-provider none

FROM node:22-slim

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json ./
COPY --from=build /index /index

EXPOSE 20310

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:20310/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

ENTRYPOINT ["./node_modules/.bin/docs-mcp-server"]
CMD ["--index-dir", "/index", "--name", "speakeasy-docs", "--tool-prefix", "speakeasy", "--transport", "http", "--port", "20310", "--stateless"]
