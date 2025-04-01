---
title: "Changelog #17: OpenAPI Webhook Support"
description: "Changes to the Speakeasy platform - January 24, 2023."
keywords:
  [
    api,
    openapi,
    swagger,
    webhooks,
    sdk,
    sdk generation,
    devex,
    dx,
    developer experience,
  ]
image: "/media/changelogs/changelog-2023-01-24.png"
date: 2023-01-24
authors:
  - name: Nolan Sullivan
  - image_url: "/media/author-headshots/nolan.jpeg"
featured_image: "/media/changelogs/changelog-2023-01-24.png"
---

Where would we be without Webhooks? Inefficient polling leading to unnecessary load on our APIs. And although Webhooks are an important part of most companies with an API strategy, they often have a less robust Developer Experience than API endpoints.

At Speakeasy, we’re doing our part to make sure that webhooks aren’t treated differently from other API endpoints. That’s why we’ve added support for OpenAPI webhook definitions in our SDK generator.

## New Features

**Webhook Support** - For each defined webhook in your OpenAPI spec, Speakeasy will generate the types for your webhook’s request, and response objects. This makes sure that whatever the endpoint type, your users have a consistent experience interfacing with your API.

**OpenAPI**

```yaml
webhooks:
  newPet:
    post:
      requestBody:
        description: Information about a new pet in the system
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Pet"
      responses:
        "200":
          description: Return a 200 status
```

**SDK Output**

```go
package webhooks

import (
    "openapi/pkg/models/shared"
)

type NewPetRequest struct {
  Request *shared.Pet `request:"mediaType=application/json"`
}

type NewPetResponse struct {
  ContentType string
  StatusCode  int64
}
```

## Small Improvements

**http.ServeMux Support** - For those interested in getting request & response logs by integrating Speakeasy server-side, we now offer support for any router based on http.ServeMux, for example: [httptrace.Mux](https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http).

**“Does Not Contain” filters** - A nice quality of life improvement. When you’re filtering logs in the Speakeasy request viewer, you can now use the “does not contain” operator to build your filters.
