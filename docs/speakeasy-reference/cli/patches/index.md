---
asIndexPage: true
---

# patches  
`speakeasy patches`  


Debug and inspect pristine vs patched SDK files  

## Usage

```
speakeasy patches [flags]
```

### Options

```
  -h, --help   help for patches
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy](/docs/speakeasy-reference/cli/getting-started)	 - The Speakeasy CLI tool provides access to the Speakeasy.com platform
### Sub Commands

* [speakeasy patches restore-pristine](/docs/speakeasy-reference/cli/patches/restore-pristine)	 - Restore files to their pristine (generated) version, discarding custom edits
* [speakeasy patches view-diff](/docs/speakeasy-reference/cli/patches/view-diff)	 - View diffs between pristine (generated) and current SDK files
* [speakeasy patches view-pristine](/docs/speakeasy-reference/cli/patches/view-pristine)	 - Show the pristine (generated) version of a tracked file
