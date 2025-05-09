# apply  
`speakeasy overlay apply`  


Given an overlay, construct a new specification by extending a specification and applying the overlay, and output it to stdout.  

## Usage

```
speakeasy overlay apply [flags]
```

### Options

```
  -h, --help             help for apply
      --out string       write directly to a file instead of stdout
  -o, --overlay string   the overlay file to use
  -s, --schema string    the schema to extend
      --strict           fail if the overlay has any action target expressions which match no nodes, and produce warnings if any overlay actions do nothing
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy overlay](/docs/speakeasy-reference/cli/overlay)	 - Work with OpenAPI Overlays
