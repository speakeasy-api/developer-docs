# overlay  
`speakeasy overlay`  


Work with OpenAPI Overlays  

## Details

# Overlay

Command group for working with OpenAPI Overlays.


## Usage

```
speakeasy overlay [flags]
```

### Options

```
  -h, --help   help for overlay
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy](/docs/speakeasy-reference/cli/getting-started)	 - The Speakeasy CLI tool provides access to the Speakeasy.com platform
### Sub Commands

* [speakeasy overlay apply](/docs/speakeasy-reference/cli/overlay/apply)	 - Given an overlay, construct a new specification by extending a specification and applying the overlay, and output it to stdout.
* [speakeasy overlay compare](/docs/speakeasy-reference/cli/overlay/compare)	 - Given two specs (before and after), output an overlay that describes the differences between them
* [speakeasy overlay validate](/docs/speakeasy-reference/cli/overlay/validate)	 - Given an overlay, validate it according to the OpenAPI Overlay specification
