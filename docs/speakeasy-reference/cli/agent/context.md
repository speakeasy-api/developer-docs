# context  
`speakeasy agent context`  


Browse agent context documentation  

## Details

Browse the embedded agent context filesystem. Provides AI agents with structured access to Speakeasy documentation.

## Usage

```
speakeasy agent context [path] [flags]
```

### Options

```
  -A, --after int     Lines of context after grep matches (overrides -C for after)
  -B, --before int    Lines of context before grep matches (overrides -C for before)
  -C, --context int   Lines of context around grep matches (default 2)
  -g, --grep string   Search content for a literal string
  -h, --help          help for context
      --json          Output in JSON format
  -l, --list          List matching file paths only (with --grep), or list all doc paths (without --grep)
  -e, --regex         Treat --grep pattern as a regular expression
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy agent](/docs/speakeasy-reference/cli/agent)	 - Docs & guided workflows for AI coding agents (start here: speakeasy agent context)
