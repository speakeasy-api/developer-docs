# deploy  
`speakeasy mcp deploy`  


[EXPERIMENTAL] Deploy an MCP server to Gram  

## Details

[EXPERIMENTAL] Deploy a generated MCP server to Gram for hosting. Requires the Gram CLI to be installed.

## Usage

```
speakeasy mcp deploy [flags]
```

### Options

```
  -d, --directory string   MCP server directory (overrides workflow.yaml output)
  -h, --help               help for deploy
  -p, --project string     Gram project name (overrides Gram default)
  -t, --target string      Target name from workflow.yaml (optional if only one MCP target exists)
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy mcp](/docs/speakeasy-reference/cli/mcp)	 - Commands for MCP server management
