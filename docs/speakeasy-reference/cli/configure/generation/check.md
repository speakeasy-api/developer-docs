# check  
`speakeasy configure generation check`  


Check gen.yaml config values against newSDK defaults for targets in workflow.yaml  

## Details

Analyzes the gen.yaml files for SDK targets defined in workflow.yaml and compares their values against the defaults for new SDKs, identifying which settings differ from the recommended defaults.

## Usage

```
speakeasy configure generation check [flags]
```

### Options

```
  -a, --all             show all config values, not just differences
  -f, --format string   output format (markdown: human-readable, table: markdown table, json: JSON output) (default "markdown")
  -h, --help            help for check
  -t, --target string   specific target to check (if not specified, checks all targets)
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy configure generation](/docs/speakeasy-reference/cli/configure/generation)	 - Configure and inspect generation settings.
