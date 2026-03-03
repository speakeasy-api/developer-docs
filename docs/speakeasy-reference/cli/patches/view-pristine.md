# view-pristine  
`speakeasy patches view-pristine`  


Show the pristine (generated) version of a tracked file  

## Usage

```
speakeasy patches view-pristine [flags]
```

### Options

```
  -d, --dir string    project directory containing .speakeasy/gen.lock (default ".")
  -f, --file string   relative path to the tracked file (e.g. src/sdk/foo.py)
  -h, --help          help for view-pristine
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy patches](/docs/speakeasy-reference/cli/patches)	 - Debug and inspect pristine vs patched SDK files
