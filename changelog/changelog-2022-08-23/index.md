---
title: "Changelog #2: Sensitive Data Masking"
description: "Changes to the Speakeasy platform - August 23, 2022."
keywords:
  [
    api,
    devex,
    dx,
    developer experience,
    openapi,
    mask sensitive data,
    middleware,
    sdk,
  ]
image: "/media/changelogs/changelog-2022-08-23.png"
date: 2022-08-23
authors:
  - name: Nolan Sullivan
  - image_url: "/media/author-headshots/nolan.jpeg"
featured_image: "/media/changelogs/changelog-2022-08-23.png"
---

### New Features

- **Mask sensitive data** - Whether it's request/response fields, headers or cookies, use the middleware controller to prevent sensitive fields from entering the platform. Alternatively, ignore entire routes by not assigning the Speakeasy middleware to the endpoint's router.

```go
func MyHandler(w http.ResponseWriter, r *http.Request) {
    ctrl := speakeasy.MiddlewareController(req)
    ctrl.Masking(speakeasy.WithRequestHeaderMask("Authorization")) // Masked header
    // the rest of your handlers code
}
```

- **Get a customer-specific view** - When you're looking at API logs, you need to be able to filter down to a single customer. By configuring the Speakeasy SDK to pick up your customer-key, you can easily breakdown to get a customer-specific view.

```go
func MyHandler(w http.ResponseWriter, r *http.Request) {
    ctrl := speakeasy.MiddlewareController(req)
    ctrl.CustomerID("a-customers-id") // Specify customer ID
    // the rest of your handlers code
}
```

### Smaller Changes

- **Easy service discovery** - Search APIs registered with the Speakeasy platform via associated metadata i.e. search by team label, version label.
