---
title: "format"
---

`speakeasy openapi transform format`  


Format an OpenAPI document using a selected output style  

## Details

Format an OpenAPI document using either the readable style or the sorted style. The sorted style accepts JSON or YAML, emits deterministic JSON, and reorders arrays under required, parameters, oneOf, anyOf, and allOf; those array orders can affect generated method signatures, union ordering, or order-sensitive tooling.

## Usage

```
speakeasy openapi transform format [flags]
```

### Options

```
  -h, --help            help for format
  -o, --out string      write directly to a file instead of stdout
  -s, --schema string   the schema to transform
      --style string    formatting style to apply (readable or sorted) (default "readable")
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy openapi transform](/docs/speakeasy-reference/cli/openapi/transform)	 - Transform an OpenAPI spec using a well-defined function
