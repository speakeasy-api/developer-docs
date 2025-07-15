---
description: "Learn how Speakeasy automatically suggests improvements to OpenAPI documents."
title: "Speakeasy Suggest"
---

# Speakeasy Suggest

Maintaining an OpenAPI schema can be time-consuming, is influenced by the idiosyncrasies of server-side frameworks
used to generate it, and directly affects downstream artifacts like documentation and SDKs. Speakeasy Suggest is an
AI-powered tool that manages the details of creating excellent OpenAPI documents.

Speakeasy Suggest reduces the burden of perfecting OpenAPI documents by automatically suggesting improvements using
AI. This represents the first of many AI-powered features designed to make spec maintenance easier.

# Auto-fix with the Speakeasy Studio UI

The Speakeasy Studio UI provides the easiest way to get automatic suggestions. The studio interacts with local
OpenAPI documents to fix issues, manage overlays, regenerate SDKs, and more.

Navigate to the [Speakeasy UI](https://app.speakeasy.com/) and log in. Go to the **Studio** tab and follow the
instructions. Alternatively, run `speakeasy run --watch` from the root of the SDK repo to start the Studio UI.

![Speakeasy Studio](/assets/docs/maintenance/studio-ui.png)

## Refine SDK method names

By default, SDKs use OpenAPI operation IDs as method names, for example, `pets.getPet()`. However,
operation IDs must be globally unique, preventing SDKs from having a truly "RESTful" interface (`pets.get()`
and `users.get()` would require both operation IDs to be `get`). Speakeasy Suggest automatically adds Speakeasy-flavored extensions to OpenAPI documents to create consistent, accurate, and idiomatic SDK method names.

### Use the Studio UI

Open the Speakeasy Studio UI following the instructions above. Click the **Improve Method Names** card to
see the suggested fixes. After a few seconds of generating the fixes, the following appears:

![Studio Method Name Suggestions](/assets/docs/maintenance/method-names-subview.png)

Review the suggested fixes, uncheck any that shouldn't be applied, and click **Apply** to apply the changes to the SDK. This creates
an [overlay file](https://www.speakeasy.com/docs/prep-openapi/overlays/create-overlays) and updates the Speakeasy workflow to apply it. Future SDK generations will use the overlay to include the applied changes.

### Use the Speakeasy CLI

The [CLI](https://github.com/speakeasy-api/speakeasy) instructs Speakeasy Suggest to improve operation IDs.

Run the following command to generate an example output:

```bash
speakeasy suggest operation-ids -s ~/Downloads/petstore.yaml -o ./updated-petstore.yaml --overlay=false
```

This command:

- Takes the `~/Downloads/petstore.yaml` file path of the OpenAPI document to analyze and improve
- Outputs the suggested fixes to the local file path `./updated-petstore.yaml`
- Disables the `overlay` output to apply the suggestions to the entire spec in the output file

Below is the output of the command:
![Speakeasy suggest output](/assets/docs/maintenance/suggest-cli.png)

## Refine SDK error handling

SDK error handling interfaces are dictated by the granularity and accuracy of response codes defined for each
operation in the OpenAPI document.
Updating every operation's responses can be tedious and error-prone. Speakeasy Suggest automatically adds common error
codes to OpenAPI documents and groups them into common categories, allowing users to catch specific error types. For example, `401`, `403`, `407`, and `511` are
mapped to an `Unauthorized` error type in the SDK.

### Use the Speakeasy CLI

The [CLI](https://github.com/speakeasy-api/speakeasy) instructs Speakeasy Suggest to improve error types.

Run the following command to generate an example output:

```bash
speakeasy suggest error-types -s ~/Downloads/petstore.yaml -o ./updated-petstore.yaml --overlay=false
```

This command:

- Takes the `~/Downloads/petstore.yaml` file path of the OpenAPI document to analyze and improve
- Outputs the suggested fixes to the local file path `./updated-petstore.yaml`
- Disables the `overlay` output to apply the suggestions to the entire spec in the output file

The document updates to include new error schemas, two of which are shown below:
![Speakeasy suggest output](/assets/docs/maintenance/error-types-schemas.png)

Each operation is updated to list the appropriate response codes and their corresponding error types:
![Speakeasy suggest output](/assets/docs/maintenance/error-types-codes.png)

Codes already defined elsewhere in the document are re-used. For example, if the `403` response code
is already defined with a `CustomUnauthorizedResponse` for one operation, it will be re-used for all operations, giving users a consistent
experience regardless of the operation being called.

### Use the Studio UI

Error type suggestions are not yet available in the Studio UI.

## Disclaimer

AI-powered schema suggestions are still in beta. Review suggested fixes before application
to OpenAPI documents.

The accuracy of fixes suggested by Speakeasy Suggest cannot be guaranteed as the AI model and
architecture are still being improved. For feedback, please
join [Speakeasy on Slack](https://go.speakeasy.com/slack).
