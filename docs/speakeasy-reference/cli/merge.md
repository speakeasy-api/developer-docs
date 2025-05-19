# merge
`speakeasy merge`  

Merge multiple OpenAPI documents into a single document.

## Details

Merging multiple OpenAPI documents together allows for multiple teams or departments to control their own API endpoints, and merge the end result later. Or one document for API endpoints, and another document for webhooks, with the end goal being getting it into one OpenAPI document to make it more portable. 

This is a bit different to "bundling" or "dereferencing", which is about pulling external references into the main document. 

**Note:** Any duplicate operations, components, etc. will be overwritten by the next document in the list.

## Usage

```
speakeasy merge [flags]
```

### Options

```
  -h, --help                           help for merge
  -o, --out string                     path to the output file
      --resolve                        resolve local references in the first schema file
  -s, --schemas path/to/schema1.json   a list of paths to OpenAPI documents to merge, specify -s path/to/schema1.json -s `path/to/schema2.json` etc
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy](/docs/speakeasy-reference/cli/getting-started)	 - The Speakeasy CLI tool provides access to the Speakeasy.com platform
