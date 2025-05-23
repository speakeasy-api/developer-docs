---
title: "Security Schemes in OpenAPI best practices"
description: "Implement secure API authentication using Security Schemes in your OpenAPI specification for better security, developer experience, and seamless integration."
---

# Security Scheme Objects in OpenAPI

Security scheme objects are defined in the [Components Object](/openapi/components) under the `securitySchemes` field. Each security scheme object has a unique key. [Security Requirement Objects](/openapi/security#security-requirement-object) elsewhere in the document reference security scheme objects by their keys.

The following example requires a basic authentication scheme to access the `/drinks` endpoint:

```yaml
paths:
  /drinks:
    get:
      security:
        - MyScheme17: []
components:
  securitySchemes:
    MyScheme17:
      type: http
      scheme: basic
```

The `type` field is the overall category of authentication. The value of `type` determines the other fields the security object needs.

To decide which authentication type to choose, see our article [OpenAPI Tips - How to Handle Auth](/post/openapi-tips-auth).

## OpenAPI-Supported Authentication Types

The following authentication types are supported in the OpenAPI Specification:

- [API Key](/openapi/security/security-schemes/security-api-key)
- [Basic HTTP](/openapi/security/security-schemes/security-basic)
- [Bearer Token](/openapi/security/security-schemes/security-bearer)
- [OAuth 2.0](/openapi/security/security-schemes/security-oauth2)
- [OpenID Connect](/openapi/security/security-schemes/security-openid)
- Digest
- Mutual TLS

## OpenAPI Example Security Scheme Schema

Below is an example security schemes object with every possible field besides extensions.

```yaml
components:
  securitySchemes:
    # apiKey ------------
    auth1:
      description: Recommended authenticator
      type: apiKey
      in: query
      name: key

    auth2:
      type: apiKey
      in: header
      name: X-API-Key

    auth3:
      type: apiKey
      in: cookie
      name: key

    # http ------------
    auth4:
      type: http
      scheme: basic

    auth5:
      type: http
      scheme: bearer
      bearerFormat: JWT

    auth6:
      type: http
      scheme: digest # not supported by Speakeasy

    # mutualTLS ------------
    auth7:
      type: mutualTLS # not supported by Speakeasy

    # openIdConnect ------------
    auth8:
      type: openIdConnect
      openIdConnectUrl: https://example.com/openidconfig.json

    # oauth2 ------------
    auth9:
      type: oauth2
      flows:
        authorizationCode:
          scopes:
            read: Grants read access
            write: Grants write access
          authorizationUrl: https://test.com/oauth/authorize
          tokenUrl: https://test.com/oauth/token
          refreshUrl: https://test.com/oauth/refresh
        clientCredentials:
          scopes:
            read: Grants read access
            write: Grants write access
          tokenUrl: https://test.com/oauth/token
          refreshUrl: https://test.com/oauth/refresh
        implicit:
          scopes:
            read: Grants read access
            write: Grants write access
          authorizationUrl: https://test.com/oauth/authorize
          refreshUrl: https://test.com/oauth/refresh
        password:
          scopes:
            read: Grants read access
            write: Grants write access
          tokenUrl: https://test.com/oauth/token
          refreshUrl: https://test.com/oauth/refresh
```
