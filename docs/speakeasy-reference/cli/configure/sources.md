# sources  
`speakeasy configure sources`  


Configure new or existing sources.  

## Details

Guided prompts to configure a new or existing source in your speakeasy workflow. When --location and --source-name are provided, runs in non-interactive mode suitable for CI/CD.

## Usage

```
speakeasy configure sources [flags]
```

### Options

```
      --auth-header string   authentication header name for remote documents (value from $OPENAPI_DOC_AUTH_TOKEN)
  -h, --help                 help for sources
  -i, --id string            the name of an existing source to configure
  -l, --location string      location of the OpenAPI document (local file path or URL); enables non-interactive mode when combined with --source-name
  -n, --new                  configure a new source
      --non-interactive      run in non-interactive mode; requires --location and --source-name
  -o, --output string        output path for the compiled source document
  -s, --source-name string   name for the source; enables non-interactive mode when combined with --location
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy configure](/docs/speakeasy-reference/cli/configure)	 - Configure your Speakeasy SDK Setup.
