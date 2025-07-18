# tests  
`speakeasy configure tests`  


Configure Speakeasy SDK tests.  

## Details

Configure your Speakeasy workflow to generate and run SDK tests..

## Usage

```
speakeasy configure tests [flags]
```

### Options

```
  -h, --help                        help for tests
      --rebuild string[="*"]        clears out all existing tests and regenerates them from scratch or if operations are specified will rebuild the tests for those operations (multiple operations can be specified as a single comma separated value) (default "*")
  -d, --workflow-directory string   directory of speakeasy workflow file
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy configure](/docs/speakeasy-reference/cli/configure)	 - Configure your Speakeasy SDK Setup.
