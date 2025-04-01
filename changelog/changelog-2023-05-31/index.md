---
title: "Changelog #26: A Copilot for your API spec and Pagination"
description: "New features to the Speakeasy Platform - May 31st, 2023."
keywords:
  [api, openapi, swagger, sdk generation, devex, dx, developer experience]
image: "/media/changelogs/changelog-2023-05-31.png"
date: 2023-05-31
authors:
  - name: Nolan Sullivan
  - image_url: "/media/author-headshots/nolan.jpeg"
featured_image: "/media/changelogs/changelog-2023-05-31.png"
---

May has been the most heads down month till date ! All of us at Speakeasy have been busy onboarding customers and gearing up for a few exciting announcements coming up (stay tuned 🚀!). To that end we’ve got some exciting feature releases from this month all in the theme making maintenance and usage of your complex API simpler than ever.

On an unrelated note, Speakeasy is growing rapidly and if you'd like to learn more about our engineering, marketing and sales roles please feel free to email back or check out our jobs page!

## New Features

LLM powered spec maintenance:: Go further with speakeasy validations with suggestions that suggest actionable changes to your API spec powered by ChatGPT.

Maintaining an API spec is hard work and error prone. As APIs and the organizations they support get larger your API spec becomes an important artifact that

deserves its own maintenance workflow. Our goal is to ease that burden with a simple speakeasy suggest command. Our LLM powered API will

suggest changes to your spec in service of making your API better documented and having more ergonomic SDKs. Soon to be available through our

Github pull request workflow - one click merge changes around the corner!

![gif of a speakeasy suggest command](https://storage.googleapis.com/speakeasy-design-assets/emails/changelog26/ezgif-1-263696a906.gif)

## Auto Pagination

Speakeasy Managed SDKs now support the ability to generate SDKs that have your pagination rules built-in.

Adding pagination into your SDK can reduce the burden on your users by removing the need to manually manage multiple pages of responses.

If your API is paginated we will provide an iterable object that users can use to loop over. For end users this means an experience that resembles:

```python
response = sdk.paginatedEndpoint(page=1)
while response is not None:
    # handle response

    response = response.next()
```

Our SDKs, starting with python, go and typescript come with support for `cursor` and `offsetLimit` pagination.

This is enabled per-operation using the `x-speakeasy-pagination` extension. Getting pagination added to your SDK is as easy as adding a configurable extension to your spec.

```yaml
x-speakeasy-pagination:
  type: offsetLimit
  inputs:
    - name: page
      in: parameters
      type: page
  outputs:
    results: $.resultArray
```

More on that [here](/docs/customize-sdks/pagination/) !

## Improvements and Bug Fixes

- Managed SDKs:
  - All languages: Support for deprecations. Get strike through IDE hints for deprecated operations
  - Terraform: Support for byte arrays and additional properties
- Speakeasy CLI
  - Now supports an interactive mode !
  - Support for chocolatey package manager for windows
