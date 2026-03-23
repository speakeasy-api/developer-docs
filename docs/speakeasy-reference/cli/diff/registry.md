# registry  
`speakeasy diff registry`  


Compare specs by registry namespace and digests  

## Details

# Diff Registry

Compare two OpenAPI spec revisions from the Speakeasy registry and show SDK-level changes.

This command will:
1. Download the old spec revision from the registry
2. Download the new spec revision from the registry
3. Compute and display SDK-level changes between them

Example usage:
```bash
speakeasy diff registry \
  --namespace my-api \
  --old sha256:abc123... \
  --new sha256:def456...

# Use a specific language for SDK diff context
speakeasy diff registry --namespace myns --old sha256:abc... --new sha256:def... --lang typescript
```

## Usage

```
speakeasy diff registry [flags]
```

### Options

```
      --format-to-yaml      Pre-format specs to YAML before diffing (helps with consistent output) (default true)
  -h, --help                help for registry
  -l, --lang string         Target language for SDK diff context (default "go")
      --namespace string    Source namespace
      --new string          New revision digest (e.g., sha256:abc123...)
      --old string          Old revision digest (e.g., sha256:abc123...)
      --org string          Organization slug (defaults to current)
  -o, --output-dir string   Directory to download specs to (default "/tmp/speakeasy-diff")
      --workspace string    Workspace slug (defaults to current)
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy diff](/docs/speakeasy-reference/cli/diff)	 - Compare spec revisions and show SDK changes
