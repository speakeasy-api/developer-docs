# file  
`speakeasy patches view-diff file`  


Show the diff between pristine (generated) and current version of a file  

## Usage

```
speakeasy patches view-diff file [flags]
```

### Options

```
  -d, --dir string    project directory containing .speakeasy/gen.lock (default ".")
  -f, --file string   relative path to the tracked file (e.g. src/sdk/foo.py)
  -h, --help          help for file
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy patches view-diff](/docs/speakeasy-reference/cli/patches/view-diff)	 - View diffs between pristine (generated) and current SDK files
