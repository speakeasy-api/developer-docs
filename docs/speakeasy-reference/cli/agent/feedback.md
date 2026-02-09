# feedback  
`speakeasy agent feedback`  


Submit feedback on agent context content  

## Details

Submit feedback on Speakeasy agent context documentation. Feedback is sent anonymously unless you are authenticated.

## Usage

```
speakeasy agent feedback [flags]
```

### Options

```
      --context-path string   The agent-context path this feedback relates to
  -h, --help                  help for feedback
  -m, --message string        The feedback message
  -t, --type string           Feedback type: agent_context, missing_guidance, or general (default "agent_context")
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy agent](/docs/speakeasy-reference/cli/agent)	 - Docs & guided workflows for AI coding agents (start here: speakeasy agent context)
