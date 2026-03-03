# files  
`speakeasy diff files`  


Compare two local spec files  

## Details

# Diff Files

Compare two OpenAPI spec files directly from disk and show SDK-level changes.

This is the simplest mode - just provide paths to your old and new spec files.

Example usage:
```bash
speakeasy diff files --old ./old-openapi.yaml --new ./new-openapi.yaml

# Use a specific language for SDK diff context
speakeasy diff files --old v1.yaml --new v2.yaml --lang typescript

# Specify output directory for intermediate files
speakeasy diff files --old old.json --new new.json --output-dir ./diff-output
```

## Usage

```
speakeasy diff files [flags]
```

### Options

```
      --format-to-yaml      Pre-format specs to YAML before diffing (helps with consistent output) (default true)
  -h, --help                help for files
  -l, --lang string         Target language for SDK diff context (default "go")
      --new string          Path to the new OpenAPI spec file
      --old string          Path to the old OpenAPI spec file
  -o, --output-dir string   Directory for intermediate files (default "/tmp/speakeasy-diff")
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy diff](/docs/speakeasy-reference/cli/diff)	 - Compare spec revisions and show SDK changes
