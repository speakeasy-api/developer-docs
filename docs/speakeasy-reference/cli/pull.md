# pull  
`speakeasy pull`  


Pull a spec from the registry or list available specs/tags  

## Details

Pull a spec from the registry or list available specs/tags.

Examples:
  # List all available specs in your workspace
  speakeasy pull --list
  speakeasy pull --list --format=json

  # List available tags for a specific spec
  speakeasy pull --spec=my-api --list-tags
  speakeasy pull --spec=my-api --list-tags --format=json

  # Pull a spec to the current directory
  speakeasy pull --spec=my-api --revision=latest

  # Pull a specific revision to a custom directory
  speakeasy pull --spec=my-api --revision=v1.0.0 --output-dir=./specs

## Usage

```
speakeasy pull [flags]
```

### Options

```
      --format string       Output format for --list and --list-tags (table, json) (default "table")
  -h, --help                help for pull
      --list                List all available specs in your workspace (non-interactive)
      --list-tags           List available tags for a spec (requires --spec)
      --output-dir string   The directory to output the spec bundle to (default "/home/runner/work/speakeasy/speakeasy/speakeasy")
      --revision string     The revision/tag to pull (default "latest")
      --spec string         The name of the spec to pull or list tags for
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy](/docs/speakeasy-reference/cli/getting-started)	 - The Speakeasy CLI tool provides access to the Speakeasy.com platform
