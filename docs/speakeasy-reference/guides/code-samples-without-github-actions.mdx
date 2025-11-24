---
title: Populate Code Samples Without GitHub Actions
description: "Learn to use the CLI to populate code samples without GitHub Actions."
---

# Using the CLI to populate code samples without GitHub Actions

This guide explains how to use the Speakeasy CLI to generate and publish code samples for your API documentation when you're not using GitHub Actions.

## Overview

Speakeasy automatically generates code samples for your OpenAPI document and makes them available via a public URL that can be integrated with documentation platforms like Scalar. While this process is typically automated with GitHub Actions, you can achieve the same result using just the Speakeasy CLI in your own custom workflow.

## Prerequisites

To follow this guide, you need:

- **The Speakeasy CLI:** Install the CLI on your computer.
- **An OpenAPI document:** Speakeasy generates your SDKs based on your OpenAPI document
- **A Speakeasy account and API key:** Ensure you have access to the Speakeasy workspace.
- **A CI environment:** The generation must run from a CI environment or with the `CI_ENABLED` environment variable set to `true`.

## Generating code samples with the Speakeasy CLI

Follow these steps to populate your OpenAPI document and make it available for use with documentation platforms:

### Configure your workflow

First, set up your workflow configuration file:

```bash
speakeasy configure
```

This creates a `.speakeasy/workflow.yaml` file that defines your SDK generation targets and code samples configuration.

### Generate SDKs and code samples

Run the Speakeasy CLI to generate your SDKs and code samples:

```bash
speakeasy run
```

This command:

- Downloads or loads your OpenAPI document
- Validates the OpenAPI document
- Generates SDKs for your configured languages
- Creates code samples for each operation in your API

### Promote code samples to main

The critical step for enabling automated code samples is to tag both your source specification (OpenAPI document) and generated code samples with the `main` tag:

```bash
speakeasy tag promote -s my-source-name -c my-target-name -t main
```

This command tags both the source OpenAPI document (`-s my-source-name`) and the generated code samples (`-c my-target-name`) as "official" so they can be incorporated into the public URL. Similar to how the `main` branch in GitHub represents the production-ready version of your code, the `main` tag in Speakeasy indicates these are the production-ready specifications and code samples that should be publicly available. Replace `my-source-name` and `my-target-name` with the names defined in your workflow configuration.

### Access the public URL

Once you've tagged your code samples with `main`, Speakeasy automatically starts building a combined OpenAPI document in the background. The combined document is available at a public URL that you can use with documentation platforms like Scalar.

To find this URL, open the Speakeasy workspace and navigate to the **Docs** tab. Click **Integrate with Docs Provider** to see the URL to the combined OpenAPI document with populated code samples. Currently, there's no CLI command to retrieve this URL programmatically.

### Integrate with docs providers

Once you have the public URL, you can integrate it with various documentation providers. Speakeasy offers detailed integration guides for several popular docs platforms:

- [Scalar](/docs/sdk-docs/integrations/scalar) is a modern API documentation platform.
- [ReadMe](/docs/sdk-docs/integrations/readme) offers an interactive API explorer and documentation.
- [Mintlify](/docs/sdk-docs/integrations/mintlify) provides developer documentation with an interactive playground.
- [Bump.sh](/docs/sdk-docs/integrations/bump) hosts API documentation and catalogs.

## Automating the process

Use the following steps to create a fully automated workflow without GitHub Actions:

- Create a script or CI pipeline that runs `speakeasy run` to generate SDKs and code samples.
- Add `speakeasy tag promote -s my-source-name -c my-target-name -t main` to tag both the source OpenAPI document and generated code samples.
- The public URL automatically updates the OpenAPI document with the latest code samples.

### Why use CLI tagging instead of GitHub Actions?

While GitHub Actions provides a convenient way to automate code sample generation and tagging, the CLI approach offers several advantages for teams:

- **Platform independence:** Use any CI/CD system (such as Jenkins, GitLab CI, CircleCI, or Azure DevOps) instead of being limited to GitHub Actions.
- **Custom workflows:** Integrate code sample generation into existing build processes or deployment pipelines.
- **Local development:** Generate and test code samples locally before pushing changes.
- **Private repositories:** Work with code that isn't hosted on GitHub or is hosted in private repositories with restricted access.
- **Enterprise environments:** Provide support for organizations with specific security or compliance requirements that prevent them from using GitHub Actions.

### Example workflow script

Here's a simple bash script example that could be used in a custom CI pipeline:

```bash
#!/bin/bash
# Install Speakeasy CLI if needed
# curl -fsSL https://raw.githubusercontent.com/speakeasy-api/speakeasy/main/install.sh | sh

# Set CI environment variable if not running in CI
export CI_ENABLED=true

# Generate SDKs and code samples
speakeasy run

# Tag both source specification and code samples as main
speakeasy tag promote -s my-source-name -c my-python-target -t main
speakeasy tag promote -s my-source-name -c my-typescript-target -t main

echo "Code samples have been generated and tagged. They will be available at the public URL in the Speakeasy dashboard."
```
