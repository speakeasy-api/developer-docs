# lint  

`speakeasy openapi lint`  

Lint an OpenAPI document  

## Details

# Lint

## OpenAPI

Validates an OpenAPI document is valid and conforms to the Speakeasy OpenAPI specification.

## Usage

```
speakeasy openapi lint [flags]
```

### Options

```
  -H, --header string                 header key to use if authentication is required for downloading schema from remote URL
  -h, --help                          help for lint
      --max-validation-errors int     limit the number of errors to output (default 1000, 0 = no limit) (default 1000)
      --max-validation-warnings int   limit the number of warnings to output (default 1000, 0 = no limit) (default 1000)
      --non-interactive               force non-interactive mode even when running in a terminal
  -r, --ruleset string                ruleset to use for linting (default "speakeasy-recommended")
  -s, --schema string                 local filepath or URL for the OpenAPI schema
      --token string                  token value to use if authentication is required for downloading schema from remote URL
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy openapi](/docs/speakeasy-reference/cli/openapi)  - Utilities for working with OpenAPI documents
