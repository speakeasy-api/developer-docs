---
title: "Security Schemes in OpenAPI"
description: "Describe API authentication and authorization in OpenAPI using security schemes."
---

# Security schemes in OpenAPI

Most APIs have some form of authorization and authentication, from simple API keys to scope-based OAuth 2 tokens on a tight rotation. APIs might support multiple methods in various combinations, so describing what goes where can become a bit of a challenge. OpenAPI helps by supporting a wide array of authorization and authentication methods, all of which you can describe under the larger umbrella of security schemes.

Security Scheme Objects are defined in the [Components Object](/openapi/components) in the `securitySchemes` section, and the `security` field references them. The `security` field is an array of Security Requirement Objects, which are maps of security scheme names to scopes.

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

Each security scheme has a unique name in the `securitySchemes` map. The `type` field specifies which authentication or authorization method (from a predefined list of supported types) is used.

## Security types

The following authorization and authentication types are supported by the OpenAPI Specification 3.1:

- [API Key](/openapi/security/security-schemes/security-api-key)
- [HTTP Authorization](/openapi/security/security-schemes/security-http) (such as Basic, Digest, and Bearer)
- [OAuth 2.0](/openapi/security/security-schemes/security-oauth2)
- [OpenID Connect](/openapi/security/security-schemes/security-openid)
- [Mutual TLS](/openapi/security/security-schemes/security-mutualtls)

## Example security scheme schema

Here's an example Security Schemes Object with the sort of values likely to be used. The names are arbitrary and just used for clarity. You can use any names you want.

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

To learn more about the different types, take a look at the guides for the [API Key](/openapi/security/security-schemes/security-api-key), [HTTP Authorization](/openapi/security/security-schemes/security-http) (including Basic, Digest, and Bearer), [OAuth 2.0](/openapi/security/security-schemes/security-oauth2), [OpenID Connect](/openapi/security/security-schemes/security-openid), and [Mutual TLS](/openapi/security/security-schemes/security-mutualtls) security schemes.

## Security requirements

Once these security schemes have been defined, they can be referenced by the `security` keyword.

Learn more about security in the [security requirements](/openapi/security) documentation.
