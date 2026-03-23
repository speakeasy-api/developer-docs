# from-pr  
`speakeasy diff from-pr`  


Compare specs from a GitHub PR  

## Details

# Diff From PR

Compare spec revisions from a GitHub pull request created by Speakeasy.

This command automatically looks up the spec revisions used in a Speakeasy-generated PR
and shows the SDK-level changes between the previous and new specs.

Example usage:
```bash
speakeasy diff from-pr https://github.com/org/sdk-repo/pull/123
```

## Usage

```
speakeasy diff from-pr [url] [flags]
```

### Options

```
      --format-to-yaml      Pre-format specs to YAML before diffing (helps with consistent output) (default true)
  -h, --help                help for from-pr
  -o, --output-dir string   Directory to download specs to (default "/tmp/speakeasy-diff")
  -v, --verbose             Show detailed event information during lookup
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy diff](/docs/speakeasy-reference/cli/diff)	 - Compare spec revisions and show SDK changes
