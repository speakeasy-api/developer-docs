# Using the CLI to populate code samples without GitHub Actions

This guide explains how to use the Speakeasy CLI to generate and publish code samples for your API documentation when you're not using GitHub Actions.

## Overview

Speakeasy can automatically generate code samples for your OpenAPI specification and make them available via a public URL that can be integrated with documentation platforms like Scalar. While this process is typically automated with GitHub Actions, you can achieve the same result using just the CLI in your own custom workflows.

## Prerequisites

- Speakeasy CLI installed
- An OpenAPI specification
- A Speakeasy account and API key

## Step-by-step process

### 1. Configure your workflow

First, set up your workflow configuration file:

```bash
speakeasy configure
```

This creates a `.speakeasy/workflow.yaml` file that defines your SDK generation targets and code samples configuration.

### 2. Generate SDKs and code samples

Run the Speakeasy CLI to generate your SDKs and code samples:

```bash
speakeasy run
```

This command:
- Downloads or loads your OpenAPI document
- Validates the OpenAPI document
- Generates SDKs for your configured languages
- Creates code samples for each operation in your API

### 3. Promote code samples to main

The critical step for enabling automated code samples is to tag your generated code samples with the `main` tag:

```bash
speakeasy tag promote -c my-target-name -t main
```

This command marks your code samples as "official" so they can be incorporated into the public URL. Similar to how the `main` branch in GitHub represents the production-ready version of your code, the `main` tag in Speakeasy indicates these are the production-ready code samples that should be publicly available. Replace `my-target-name` with the name of your target as defined in your workflow configuration.

### 4. Access the public URL

Once you've tagged your code samples with `main`, Speakeasy will automatically start building a combined spec in the background. The combined spec will be available at a public URL that you can use with documentation platforms like Scalar.

To find this URL, you'll need to visit the Speakeasy dashboard and navigate to the **Docs** tab. Currently, there's no CLI command to retrieve this URL programmatically.

### 5. Integrate with Scalar

Once you have the public URL, you can integrate it with Scalar:

1. Open a Scalar project
2. Go to the **Reference** tab
3. Click **Import URL**
4. Paste the combined spec URL from Speakeasy
5. Click **Import**

## Automating the process

For a fully automated workflow without GitHub Actions:

1. Create a script or CI pipeline that runs `speakeasy run` to generate SDKs and code samples
2. Add `speakeasy tag promote -c my-target-name -t main` to tag the generated code samples
3. The public URL will automatically update with the latest code samples

## Important notes

- The `main` tag is essential - it tells Speakeasy that these code samples are "official" and should be included in the public URL
- Once set up, the public URL never changes - it will always serve the latest version of your combined spec
- Currently, retrieving the public URL requires manual access to the Speakeasy dashboard

## Example workflow script

Here's a simple bash script example that could be used in a custom CI pipeline:

```bash
#!/bin/bash
# Install Speakeasy CLI if needed
# curl -fsSL https://raw.githubusercontent.com/speakeasy-api/speakeasy/main/install.sh | sh

# Generate SDKs and code samples
speakeasy run

# Tag code samples as main
speakeasy tag promote -c my-python-target -t main
speakeasy tag promote -c my-typescript-target -t main

echo "Code samples have been generated and tagged. They will be available at the public URL in the Speakeasy dashboard."
```
