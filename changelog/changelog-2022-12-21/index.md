---
title: "Changelog #14: Terraform Generation Alpha"
description: "Changes to the Speakeasy platform - December 21, 2022."
keywords:
  [
    api,
    openapi,
    swagger,
    terraform provider,
    terraform,
    sdk,
    sdk generation,
    retries,
    devex,
    dx,
    developer experience,
  ]
image: "/media/changelogs/changelog-2022-12-21.png"
date: 2022-12-21
authors:
  - name: Nolan Sullivan
  - image_url: "/media/author-headshots/nolan.jpeg"
featured_image: "/media/changelogs/changelog-2022-12-21.png"
---

If you are interested in being an alpha user for our Terraform provider generator, please respond to this email to let us know!

Github’s 2022 annual review crowned HCL (hashicorp configuration language) as the fastest growing language (56%), even beating out developer darling, Rust, for the top spot. It is a testament to the establishment of infrastructure as code (IaC) as a leading development practice and the popularity of Terraform as the medium for infrastructure management.

The best developer companies meet their users where they already are, to flatten the learning curve and provide a great DevEx. For some API companies that increasingly means a terraform provider so that the resources exposed by the API can be managed in concert with any related infrastructure. However, like SDKs, a terraform provider becomes another artifact that needs ongoing investment & management. That’s why we’ve been working on a way to enable teams to auto-generate terraform providers from their OpenAPI definition.

## Alpha Release

**Terraform Provider Generation** - Just add annotations to your OpenAPI specification’s entities and operations. Speakeasy will then process your spec to produce and maintain a terraform-registry compliant provider plugin, that will create, update and destroy persistent resources by interacting with your APIs. As an example, imagine the pet entity from the canonical petshop example:

```yaml
paths:
 /pet:
   post:
     tags:
       - pet
     summary: Add a new pet to the store
     x-speakeasy-entity-operation: Pet#create
     description: Add a new pet to the store
     operationId: addPet
     responses:
       '200':
         description: Successful operation
         content:
           application/json:
             schema:
               $ref: '#/components/schemas/Pet'
     requestBody:
       description: Create a new pet in the store
       required: true
       content:
         application/json:
           schema:
             $ref: '#/components/schemas/Pet'
…
Pet:
 x-speakeasy-entity: Pet
 required:
   - name
   - photoUrls
 properties:
   id:
     type: integer
     format: int64
     example: 10
   name:
     type: string
   category:
     $ref: '#/components/schemas/Category'
   photoUrls:
     type: array
     items:
       type: string
…
```

Adding the `x-speakeasy-entity` annotation to a resource-based API, along with annotations to each operation such as:

- `x-speakeasy-entity-operation: Pet#create`
- `x-speakeasy-entity-operation: Pet#delete`
- `x-speakeasy-entity-operation: Pet#update`

are all that’s required to generate a valid terraform provider with terraform-registry documentation, usable like the following:

```HCL
resource "petstore_pet" "myPet" {
 name = "Freddie"
 photo_urls = ["https://example.com/example.jpg"]
 tags = {
   name = "foo"
 }
}
```

Speakeasy will output this provider plugin to a github repository, annotating resources with Computed, ReadOnly, Required and ForceNew attributes based upon the semantics of how they’re used in Create/Update operations.

If you would like us to generate a terraform provider from your OpenAPI definition, please get in touch! We’re actively looking for design partners for whom we can generate/maintain terraform providers for your API.

## New Features

**SDK Retries** - Every SDK should have retries. It’s one of the things that makes for a great DevEx. End-users shouldn’t be left to figure out what errors should trigger retries, which shouldn’t, and how long you should wait before resending. Nobody knows an API better than the builder, and that’s who should be determining when a retry is appropriate. That’s why we’ve added the ability for our users to extend their OpenAPI spec and configure retry logic for their SDKs.

```yaml
x-speakeasy-retries:
  strategy: backoff
  backoff:
    initialInterval: 100 # 100 ms
    maxInterval: 30000 # 30s
    exponent: 2 # backoff delay doubles from 100ms until 30s
    maxElapsedTime: 300000 # After 5 minutes, returns a failure to the callee
  statusCodes: # a list of status codes to retry on (supports XX wildcards)
    - 429
    - 5XX
  retryConnectionErrors: true # whether to retry connection errors
```
