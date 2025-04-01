---
title: "Changelog: Unity and C# now available as generation targets!"
description: "New features to the Speakeasy Platform - October 19th, 2023."
keywords: [api, openapi, swagger, sdk generation, devex, dx, developer experience]
image: "/media/changelogs/changelog-2023-10-19.png"
date: 2023-10-19
authors:
  - name: Anuraag Nalluri
  - image_url: "/media/author-headshots/anuraag.jpeg"
featured_image: "/media/changelogs/changelog-2023-10-19.png"
---

While we haven’t had a Changelog post for a minute, the Eng team here at Speakeasy has been heads down building out a laundry list of new features and capabilities. In this Changelog we share a few of these new features including the addition of Unity and C# as generation targets.

## New Features

### C# generation

C# has an active community of developers and diverse uses across desktop, web, mobile, cloud, IoT, ML, and gaming apps. We’re excited to announce that Speakeasy now supports C# SDK creation! Speakeasy C# SDKs are designed to be easy to use and easy to debug. Our SDK design is guided by:

- Minimal dependencies and relying on the C# standard library as much as possible.
- SDK & sub SDKs implement full interfaces so that the SDKs are ready for dependency-injection.
- Requests are async so that you can await them or run them asynchronously.
- Nullable fields for optional objects, including fields/parameters/response and request bodies, to ensure that the user can differentiate between a field not being set and a field being set to a zero value.
- Compatible with net5.0 projects for partial Unity support.

### Unity generation

Unity is used by developers of all sizes, from small indie studios to large AAA studios. And now, all of these developers can take advantage of Speakeasy’s newly launched support of Unity SDK creation! Our Unity SDK offers:

- Native `UnityWebRequest` support so it’ll work on all of Unity’s target platforms
- Models are Serializable and can be used with Unity Editor and plugins
- Supports streaming downloads
- Works with async/await and coroutines

### Multi-level Namespacing

Our SDKs now support multi-level namespacing to enable interfaces that more closely match your organization’s resource structure! You can read more about it [here](/docs/customize-sdks/namespaces/#multi-level-namespacing)

### Monkey Patching SDKs via .genignore

We now support the use of `.genignore` to monkey patch your SDKs with any custom business logic, usage snippets, or documentation that regeneration won’t override! You can read more about it in the [monkey patching documentation](/docs/customize/code/monkey-patching).

## 🐜 Improvements and Bug Fixes 🐛

### Managed SDKs and Terraform providers

- Python - id / object keywords
- Ruby / Swift - Empty request body issues
- publishing of typescript docs folders
- validation of oneOf objects with nested references
- Mandatory entity support in terraform
- Support for arbitrary names in multipart file upload for Typescript

### Product onboarding

- Moved API key creation for SDK generation to the backend
- Long term fix for the issue where repos were getting created without the SPEAKEASY_API_KEY secret
- Guarantees that each workspace will have exactly one key used for generation in GitHub and that that key is always added as a secret to every repo that gets created for that workspace
- Speakeasy API Key not attached on new SDK repos

For the latest on feature and bug status, check out the [Speakeasy Public Roadmap](https://speakeasy.productlane.com/roadmap) and follow us on [X](https://twitter.com/speakeasydev?s=20) and [LinkedIn](https://www.linkedin.com/company/speakeasyapi/). Have a feature request or bug to report? Message us on [Slack](https://join.slack.com/t/speakeasy-dev/shared_invite/zt-22t74wuw4-AvdeauhFtUPEBk~CIhg1HQ) or log an [issue](https://github.com/orgs/speakeasy-api/repositories) on GitHub.
