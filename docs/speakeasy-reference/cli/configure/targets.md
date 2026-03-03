# targets  
`speakeasy configure targets`  


Configure new or existing targets.  

## Details

Guided prompts to configure a new or existing target in your speakeasy workflow. When --target-type and --source are provided, runs in non-interactive mode suitable for CI/CD.

## Usage

```
speakeasy configure targets [flags]
```

### Options

```
      --base-server-url string   base server URL for the SDK
  -h, --help                     help for targets
  -i, --id string                the name of an existing target to configure
  -n, --new                      configure a new target
      --non-interactive          run in non-interactive mode; requires --target-type and --source
  -o, --output string            output directory for the generated target
      --package-name string      package name for the generated SDK
      --sdk-class-name string    SDK class name (PascalCase, e.g., MyCompanySDK)
  -s, --source string            name of the source to generate from; enables non-interactive mode when combined with --target-type
      --target-name string       name for the target (defaults to target-type if not specified)
  -t, --target-type string       target language/type: typescript, python, go, java, csharp, php, ruby, terraform, mcp-typescript; enables non-interactive mode
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy configure](/docs/speakeasy-reference/cli/configure)	 - Configure your Speakeasy SDK Setup.
