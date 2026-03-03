# diff  
`speakeasy openapi diff`  


Visualize the changes between two OpenAPI documents  

## Details

Visualize the **raw OpenAPI schema changes** between two documents - paths added/removed,
operations changed, properties modified, etc.

This is different from `speakeasy diff` which shows SDK-level changes (how generated
SDK methods and types would differ). Use this command when you want to see the raw
specification differences.

## Usage

```
speakeasy openapi diff [flags]
```

### Options

```
  -f, --format string   output format (available options: [summary console html]) (default "summary")
  -h, --help            help for diff
      --new string      local filepath or URL for the updated OpenAPI schema
      --old string      local filepath or URL for the base OpenAPI schema to compare against
  -o, --output string   output file (default "-")
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy openapi](/docs/speakeasy-reference/cli/openapi)	 - Utilities for working with OpenAPI documents
