# quickstart  
`speakeasy quickstart`  


Guided setup to help you create a new SDK in minutes.  

## Details

Guided setup to help you create a new SDK in minutes.

## Usage

```
speakeasy quickstart [flags]
```

### Options

```
  -f, --from string           template to use for the quickstart command.
                              Create a new sandbox at https://app.speakeasy.com/sandbox
  -h, --help                  help for quickstart
  -n, --name string           SDK name in PascalCase (e.g., "MyCompanySDK"). Users access SDK methods with myCompanySDK.DoThing()
  -o, --out-dir string        output directory for the quickstart command
      --output string         how to display output (available options: [summary, console, mermaid]) (default "summary")
  -p, --package-name string   package name for the generated SDK (e.g., "my-company-sdk" for npm, Go module path for Go)
  -s, --schema string         local filepath, URL, or registry reference (org/workspace/namespace) for the OpenAPI schema
      --skip-compile          skip compilation during generation after setup
  -t, --target string         generation target (available options: [csharp, go, java, mcp-typescript, php, postman, python, ruby, terraform, typescript, unity])
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy](/docs/speakeasy-reference/cli/getting-started)	 - The Speakeasy CLI tool provides access to the Speakeasy.com platform
