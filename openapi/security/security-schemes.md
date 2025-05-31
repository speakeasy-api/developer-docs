---
title: "Security Schemes in OpenAPI"
description: "Describe API authentication and authorization in OpenAPI using Security Schemes."
---

# Security schemes in OpenAPI

Most APIs have some form of authorization and/or authentication, from simple API keys to scope-based OAuth 2 tokens on a tight rotation. APIs might support multiple methods in various combinations, so describing what goes where can become a bit of a challenge. OpenAPI helps by supporting a wide array of authorization and authentication methods, all of which can described under the larger umbrella of Security Schemes.

Security scheme objects are defined in the [Components Object](/openapi/components) in the `securitySchemes` section, and the `security` field references them. The `security` field is an array of security requirement objects, which are maps of security scheme names to scopes.

```yaml
paths:
  /drinks:
    get:
      security:
        - MySchemeAbc: []
components:
  securitySchemes:
    MySchemeAbc:
      type: http
      scheme: basic
```

Each security scheme has a unique name in the `securitySchemes` map, and the `type` field specifies which authentication or authorization method will be used from a predefined list of supported types.

## Security types

The following authorization/authentication types are supported by OpenAPI as of v3.1:

- [API Key](/openapi/security/security-schemes/security-api-key)
- [HTTP Authorization](/openapi/security/security-schemes/security-basic) (E.g: Basic, Digest, Bearer, and more)
- [OAuth 2.0](/openapi/security/security-schemes/security-oauth2)
- [OpenID Connect](/openapi/security/security-schemes/security-openid)
- [Mutual TLS](/openapi/security/security-schemes/security-mutualtls)

## OpenAPI example security scheme schema

Here's an example security schemes object with the sort of values likely to be used. The names are arbitrary and just used for clarity, but could be whatever you want.

```yaml
components:
  securitySchemes:
    # apiKey ------------
    ApiKeyInQuery:
      type: apiKey
      in: query
      name: key

    ApiKeyInCustomHeader:
      type: apiKey
      in: header
      name: Acme-API-Key

    ApiKeyInCookie:
      type: apiKey
      in: cookie
      name: key

    # http ------------
    HttpBasic:
      type: http
      scheme: basic

    HTTPDigest:
      type: http
      scheme: digest # not supported by Speakeasy

    JWT:
      type: http
      scheme: bearer
      bearerFormat: JWT

    # mutualTLS ------------
    MutualTLS:
      type: mutualTLS # not supported by Speakeasy

    # openIdConnect ------------
    OpenId:
      type: openIdConnect
      openIdConnectUrl: https://example.com/openidconfig.json

    # oauth2 ------------
    OAuth2:
      type: oauth2
      flows:
        authorizationCode:
          scopes:
            read: Grants read access
            write: Grants write access
          authorizationUrl: https://example.org/oauth/authorize
          tokenUrl: https://example.org/oauth/token
          refreshUrl: https://example.org/oauth/refresh
        clientCredentials:
          scopes:
            read: Grants read access
            write: Grants write access
          tokenUrl: https://example.org/oauth/token
          refreshUrl: https://example.org/oauth/refresh
        implicit:
          scopes:
            read: Grants read access
            write: Grants write access
          authorizationUrl: https://example.org/oauth/authorize
          refreshUrl: https://example.org/oauth/refresh
        password:
          scopes:
            read: Grants read access
            write: Grants write access
          tokenUrl: https://example.org/oauth/token
          refreshUrl: https://example.org/oauth/refresh
```

To learn more about different types of security schemes, take a look at the guides for [API Key](/openapi/security/security-schemes/security-api-key), [HTTP Authorization](/openapi/security/security-schemes/security-basic) (Basic, Digest, Bearer, and more), [OAuth 2.0](/openapi/security/security-schemes/security-oauth2), [OpenID Connect](/openapi/security/security-schemes/security-openid), or [Mutual TLS](/openapi/security/security-schemes/security-mutualtls).


## Global authentication vs endpoint authentication

Security can be applied at two levels in OpenAPI:

- **Global security:** the security specified is available for all operations.
- **Per operation security:** only applied to the operation, overriding any global level security.

Here is an example of describing security in the ways mentioned above:

The important parts of the above example are the [security](https://spec.openapis.org/oas/v3.1.0#security-requirement-object) and [securitySchemes](https://spec.openapis.org/oas/v3.1.0#security-scheme-object/security-schemes) sections. We will go into some details about how they are defined and the options available.

## How to describe security

The [security](https://spec.openapis.org/oas/v3.1.0#security-requirement-object) section is a list (of key-value pairs, but we will talk a bit more about that later) of security schemes that can be used to authenticate all operations or a particular operation (depending on the scope of the [security](https://spec.openapis.org/oas/v3.1.0#security-requirement-object) list).

```
security:
  - MySchemeAbc: []
```

To learn more about how the `security` keyword works in the [OpenAPI Security guide](/openapi/security.mdx). 
