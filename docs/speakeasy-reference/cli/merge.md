# merge  
`speakeasy merge`  


Merge multiple OpenAPI documents into a single document  

## Details

Merge multiple OpenAPI documents into a single document, useful for merging multiple OpenAPI documents into a single document for generating a client SDK.
Note: That any duplicate operations, components, etc. will be overwritten by the next document in the list.

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
