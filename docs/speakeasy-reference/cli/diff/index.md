---
asIndexPage: true
---

# diff  
`speakeasy diff`  


Compare spec revisions and show SDK changes  

## Details

# Diff

Compare OpenAPI spec revisions and show **SDK-level changes** - how the generated
SDK methods, models, and types would differ between two spec versions.

This is different from `speakeasy openapi diff` which shows raw OpenAPI schema
changes (paths, operations, properties). Use this command when you want to understand
the impact on your generated SDK code.

This command supports three modes:

## Files Mode (Local)
Compare two spec files directly from disk:
```bash
speakeasy diff files --old old-spec.yaml --new new-spec.yaml
```

## From PR Mode
Look up specs from a GitHub pull request created by Speakeasy:
```bash
speakeasy diff from-pr https://github.com/org/repo/pull/123
```

## Registry Mode
Compare specs by providing registry namespace and digest values:
```bash
speakeasy diff registry --namespace my-api --old sha256:abc... --new sha256:def...
```

## Usage

```
speakeasy diff [flags]
```

### Options

```
  -h, --help   help for diff
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy](/docs/speakeasy-reference/cli/getting-started)	 - The Speakeasy CLI tool provides access to the Speakeasy.com platform
### Sub Commands

* [speakeasy diff files](/docs/speakeasy-reference/cli/diff/files)	 - Compare two local spec files
* [speakeasy diff from-pr](/docs/speakeasy-reference/cli/diff/from-pr)	 - Compare specs from a GitHub PR
* [speakeasy diff registry](/docs/speakeasy-reference/cli/diff/registry)	 - Compare specs by registry namespace and digests
