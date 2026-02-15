# setup-skills
`speakeasy agent setup-skills`


Install Speakeasy agent skills for AI coding assistants

## Details

Install companion skills for AI coding assistants (Claude Code, Cursor, etc.) from the Speakeasy skills package. Skills are fetched from the [Speakeasy skills repository](https://github.com/speakeasy-api/skills), written to `.agents/skills/` (canonical location), and symlinked into each selected agent's skills directory.

In interactive mode, the command presents:
1. A confirmation prompt
2. An agent multi-select (Claude Code, Cursor, Windsurf, Copilot, and Codex are preselected)
3. A skill multi-select (speakeasy-context is preselected)

## Usage

```
speakeasy agent setup-skills [flags]
```

### Options

```
      --auto   Install only default skills (speakeasy-context) without prompting
  -h, --help   help for setup-skills
```

### Options inherited from parent commands

```
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Parent Command

* [speakeasy agent](/docs/speakeasy-reference/cli/agent)	 - Docs & guided workflows for AI coding agents (start here: speakeasy agent context)
