# file  
`speakeasy patches restore-pristine file`  


Restore a file to its pristine (generated) version, discarding custom edits  

## Usage

```
speakeasy patches restore-pristine file [flags]
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

* [speakeasy patches restore-pristine](/docs/speakeasy-reference/cli/patches/restore-pristine)	 - Restore files to their pristine (generated) version, discarding custom edits
