# speakeasy  
`speakeasy`  


The Speakeasy CLI tool provides access to the Speakeasy.com platform  

## Details

# Speakeasy 

A CLI tool for interacting with the [Speakeasy platform](https://www.speakeasy.com/) and its APIs.

Use this CLI to:
- Lint and validate OpenAPI specs
- Create, manage, and run Speakeasy workflows
- Configure GitHub Actions for Speakeasy workflows
- Suggest improvements to OpenAPI specs

Generate from OpenAPI Specs:
- Client and Server SDKs in GO, Python, TypeScript, Java, PHP, C#, Ruby
- Postman collections
- Terraform providers

[Quickstart guide](https://www.speakeasy.com/docs/create-client-sdks)

Visit [Speakeasy](https://www.speakeasy.com/) for more information


## Usage

```
speakeasy [flags]
```

### Options

```
  -h, --help              help for speakeasy
      --logLevel string   the log level (available options: [info, warn, error]) (default "info")
```

### Sub Commands

* [speakeasy ask](/docs/speakeasy-reference/cli/ask)	 - Starts a conversation with Speakeasy trained AI
* [speakeasy auth](/docs/speakeasy-reference/cli/auth)	 - Authenticate the CLI
* [speakeasy billing](/docs/speakeasy-reference/cli/billing)	 - Manage billing related operations
* [speakeasy bump](/docs/speakeasy-reference/cli/bump)	 - Bumps the version of a Speakeasy Generation Target
* [speakeasy clean](/docs/speakeasy-reference/cli/clean)	 - Speakeasy clean can be used to clean up cache, stale temp folders, and old CLI binaries.
* [speakeasy configure](/docs/speakeasy-reference/cli/configure)	 - Configure your Speakeasy SDK Setup.
* [speakeasy lint](/docs/speakeasy-reference/cli/lint)	 - Lint/Validate OpenAPI documents and Speakeasy configuration files
* [speakeasy merge](/docs/speakeasy-reference/cli/merge)	 - Merge multiple OpenAPI documents into a single document
* [speakeasy openapi](/docs/speakeasy-reference/cli/openapi)	 - Utilities for working with OpenAPI documents
* [speakeasy overlay](/docs/speakeasy-reference/cli/overlay)	 - Work with OpenAPI Overlays
* [speakeasy quickstart](/docs/speakeasy-reference/cli/quickstart)	 - Guided setup to help you create a new SDK in minutes.
* [speakeasy run](/docs/speakeasy-reference/cli/run)	 - Run all the workflows defined in your workflow.yaml file. This can include multiple SDK generations from different OpenAPI sources
* [speakeasy status](/docs/speakeasy-reference/cli/status)	 - Review status of current workspace
* [speakeasy suggest](/docs/speakeasy-reference/cli/suggest)	 - Automatically improve your OpenAPI document with an LLM
* [speakeasy tag](/docs/speakeasy-reference/cli/tag)	 - Add tags to a given revision of your API. Specific to a registry namespace
* [speakeasy test](/docs/speakeasy-reference/cli/test)	 - For each workflow target, starts the mock API server and runs testing.
* [speakeasy update](/docs/speakeasy-reference/cli/update)	 - Update the Speakeasy CLI to the latest version
