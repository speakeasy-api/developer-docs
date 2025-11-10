# snip  
`speakeasy openapi snip`  


Remove operations from an OpenAPI specification  

## Details

Remove operations from an OpenAPI specification and clean up unused components.

This command can operate in two modes:

**Remove Mode (default):**
Removes the specified operations from the document.

**Keep Mode (--keep flag):**
Keeps only the specified operations and removes everything else.

## Specifying Operations

Operations can be specified in two ways:

1. **By Operation ID** (using --operationId):
   The operationId field from your OpenAPI spec

2. **By Path and Method** (using --operation):
   Format: path:METHOD
   Example: /users/{id}:DELETE

You can specify multiple operations by:
- Using the flag multiple times: --operation /users:GET --operation /users:POST
- Using comma-separated values: --operation /users:GET,/users:POST

## Examples

Remove specific operations by operation ID:
```
speakeasy openapi snip --schema ./spec.yaml --operationId deleteUser --operationId adminDebug
```

Remove operations by path and method:
```
speakeasy openapi snip --schema ./spec.yaml --operation /users/{id}:DELETE --operation /admin:GET
```

Keep only specified operations (remove everything else):
```
speakeasy openapi snip --schema ./spec.yaml --keep --operation /users:GET --operation /users:POST
```

Write to a file instead of stdout:
```
speakeasy openapi snip --schema ./spec.yaml --out ./public-spec.yaml --operation /internal:GET
```

Pipe to other commands:
```
speakeasy openapi snip --schema ./spec.yaml --operation /debug:GET | speakeasy openapi lint
```

## Usage

```
speakeasy openapi snip [flags]
```

### Options

```
  -h, --help                  help for snip
  -k, --keep                  keep mode: keep specified operations and remove all others
      --operation strings     operation as path:method to process (can be comma-separated or repeated) (comma-separated list)
      --operationId strings   operation ID to process (can be comma-separated or repeated) (comma-separated list)
  -o, --out string            write to a file instead of stdout
  -s, --schema string         the OpenAPI schema to process
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy openapi](/docs/speakeasy-reference/cli/openapi)	 - Utilities for working with OpenAPI documents
