# repro  
`speakeasy repro`  


Reproduce a failed generation locally  

## Details

# Reproduce a failed generation locally

Download and reproduce a failed SDK generation locally for debugging purposes.

This command will:
1. Fetch the CLI events for the provided execution ID
2. Download the merged/overlayed OpenAPI spec that was actually used for generation (default)
3. Create a local reproduction environment with all necessary files
4. Automatically run 'speakeasy run' to reproduce the generation

By default, this command downloads the final merged spec that was used for generation.
Use --use-raw-workflow if you need to debug overlay or workflow source issues.

Example usage:
```bash
speakeasy repro --execution-id c303282d-f2e6-46ca-a04a-35d3d873712d
speakeasy repro --execution-id c303282d-f2e6-46ca-a04a-35d3d873712d --directory /tmp/debug
speakeasy repro --execution-id c303282d-f2e6-46ca-a04a-35d3d873712d --use-raw-workflow  # Debug workflow/overlay issues
```

## Usage

```
speakeasy repro [flags]
```

### Options

```
  -d, --directory string      Directory to create reproduction files in (default: /tmp/{orgSlug}.{workspaceSlug})
  -e, --execution-id string   Execution ID of the generation to reproduce
  -h, --help                  help for repro
      --use-raw-workflow      Use the original workflow to debug overlay/source issues (default: use merged spec)
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy](/docs/speakeasy-reference/cli/getting-started)	 - The Speakeasy CLI tool provides access to the Speakeasy.com platform
