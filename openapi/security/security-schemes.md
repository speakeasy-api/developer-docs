---
title: "Security Schemes in OpenAPI"
description: "Describe API authentication and authorization in OpenAPI using Security Schemes."
---

# Security Schemes in OpenAPI

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

## OpenAPI Example Security Scheme Schema

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

Below is an example of a number of different ways you can use the [security](https://spec.openapis.org/oas/v3.1.0#security-requirement-object) section of your document:

The items in the list are key-value pairs with a name or key of a security scheme defined in the components section. We recommend giving them a boring name that explains what they are.

The values are an array of scopes used only by the [oauth2](https://spec.openapis.org/oas/v3.1.0#oauth2-security-requirement) and [openIdConnect](https://tools.ietf.org/html/draft-ietf-oauth-discovery-06) type schemes, and define what scopes are needed for the API.

When used as shown above it provides a list of available schemes that can be used, with the end-user of the API being able to choose one of the available schemes to use to authenticate.

If more than one scheme is required to authenticate an API, then that is where additional pairs in the key-value pairs come in. See the example below:

Combining schemes like above give you the option to define AND/OR type functionality when it comes to the requirements of your API.

## How to describe security schemes

[securitySchemes](https://spec.openapis.org/oas/v3.1.0#security-scheme-object/security-schemes) are the actual details of the options provided in the [security](https://spec.openapis.org/oas/v3.1.0#security-requirement-object) sections of your document. The security schemes are components that are defined with the [components](https://spec.openapis.org/oas/v3.1.0#components-object) section of your document. Below is an example of the 5 types of security schemes described above and how they are defined:
