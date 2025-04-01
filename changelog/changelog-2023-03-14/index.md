---
title: "Changelog #22: Improved DevEX with Flattened SDKs"
description: "Changes to the Speakeasy platform - March 14, 2023."
keywords:
  [api, openapi, swagger, sdk generation, devex, dx, developer experience]
image: "/media/changelogs/changelog-2023-03-14.png"
date: 2023-03-14
authors:
  - name: Nolan Sullivan
  - image_url: "/media/author-headshots/nolan.jpeg"
featured_image: "/media/changelogs/changelog-2023-03-14.png"
---

Despite what some NBA players may believe, the world is not flat. But Speakeasy-created SDKs now are!

As the user of an API, you don’t want to have to understand the technical detail of the API you are using. You just want to understand what input is expected, and what output I should expect in return. Everything else is a distraction.

We're raising the bar for API developer experience, and ensuring the SDKs produced by Speakeasy are as easy to use as possible. That’s why we’re excited to release a new flattened structure to our SDKs.

## New Features

**Flattened SDKs:** Users no longer need to understand whether the inputs to your API are query params, path params, headers, or request bodies. The SDK abstracts away all those details. Users just need to provide the relevant data as key-value pairs -- the SDK will construct the correct call to the API.

That means less code that your users need to write, more easily understood interfaces, faster integration times, and an overall improved developer experience.

You don’t need to do anything to generate with the new SDK structure. If you’ve set up an automated pipeline, it will run with flattened requests as the new default. If you’re using the CLI, then simply upgrade to the latest version.

Here's an example of before and after the new flattened structure, using the Speakeasy API (SDK) for adding a user to a workspace.

**Old:**

```python
import speakeasy
from speakeasy.models import operations, shared

s = speakeasy.SDK()
s.config_security(
    security=shared.Security(
        api_key_authentication=shared.SchemeAPIKeyAuthentication(
            api_key="YOUR_API_KEY_HERE",
        )
    )
)
req = operations.AddUserToWorkspaceRequest(
    path_params=operations.AddUserToWorkspacePathParams(
        project_id=548814,
    ),
    request=shared.AddUserToWorkspaceRequest(
        user="nolan",
    )
)
res = s.workspace.add_user_to_workspace(req)
if res.generic_api_response is not None:
    # handle response
```

**New**:

```python
import speakeasy
from speakeasy.models import operations, shared

s = speakeasy.SDK(api_key="YOUR_API_KEY_HERE")
req = operations.AddUserToWorkspaceRequest(
    project_id=548814,
    add_user_to_workspace_request=shared.AddUserToWorkspaceRequest(
        user="nolan",
    ),
)
res = s.workspace.add_user_to_workspace(req)
if res.generic_api_response is not None:
    # handle response
```
