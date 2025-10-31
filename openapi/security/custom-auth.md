---
title: Custom Security Schemes in OpenAPI best practices
description: "Implement custom API authentication using Security Schemes in your OpenAPI specification for better security, developer experience, and seamless integration."
---
# Custom Authentication Schemes in OpenAPI

OpenAPI supports several built-in security scheme types, including **API key**, **HTTP**, **OAuth 2.0**, and **OpenID Connect (OIDC)**. However, you may need to implement custom authentication that doesn't fit these categories.

This guide explains how to effectively document custom authentication in an OpenAPI document.

## Why Use Custom Authentication?

While standard security schemes work for most APIs, you may need custom authentication if you have:

- **Complex authentication flows**: Multi-step or multi-factor authentication processes.
- **Proprietary protocols**: Custom token formats or signature-based systems.
- **Legacy systems**: Authentication mechanisms that pre-date common standards.
- **Enhanced security**: Authentication that combines multiple verification methods.

## How To Define Custom Authentication

OpenAPI supports the following custom authentication approaches:

- **Extending a base security scheme**: Use an existing scheme type (typically `apiKey`) and enhance it with `x-` extensions.
- **Providing comprehensive documentation**: Clearly explain implementation details that cannot be fully expressed in the schema.

Here's an example of a custom authentication scheme using `apiKey`:

```yaml
components:
  securitySchemes:
    customAuth:
      type: apiKey  # Use apiKey as the foundation
      in: header
      name: X-Custom-Auth
      description: >
        Custom authentication scheme requiring a specially formatted token.
        See implementation notes below for token generation details.
      x-custom-auth-type: signature-based
      x-token-format: "prefix.signature.timestamp"
```

## Signature-Based Authentication

Some APIs use signatures to authenticate and verify requests. Here's how to document a signature-based scheme:

```yaml
components:
  securitySchemes:
    signatureAuth:
      type: apiKey
      in: header
      name: X-Signature
      description: >
        Authentication using a signature generated from the request payload,
        timestamp, and secret key. Requires additional headers.
      x-signature-algorithm: HMAC-SHA256
      x-required-headers:
        - X-Timestamp
        - X-API-Key
```

## Multipart Authentication Schemes

Some APIs require multiple keys or tokens for authentication:

```yaml
components:
  securitySchemes:
    multiPartAuth:
      type: apiKey
      in: header
      name: X-Primary-Token
      description: >
        Multi-part scheme requiring multiple authentication components.
      x-additional-authentication:
        - name: X-Secondary-Token
          in: header
          description: Secondary token (typically for service-specific access)
        - name: X-Auth-Timestamp
          in: header
          description: Current timestamp in Unix epoch format (seconds)
```

## Using OpenAPI Extensions Effectively

OpenAPI extensions provide flexibility for describing authentication details:

```yaml
components:
  securitySchemes:
    customScheme:
      # ...standard fields...
      x-auth-generation-url: https://api.example.com/auth/token
      x-auth-expiration: 3600  # token lifetime in seconds
      x-rate-limit-authenticated: 1000  # requests per hour
      x-rate-limit-unauthenticated: 10  # requests per hour
```

Use extensions to document:

- Token formats
- Authentication steps
- SDK implementation requirements
- Rate limits and resource access rules

## Tips for Custom Authentication

### 1. Provide detailed implementation steps

Clearly document:

- **Token generation**: Exact algorithm and inputs for creating tokens.
- **Required headers**: All headers needed and their formats.
- **Validation steps**: How servers validate the authentication.
- **Error handling**: Specific errors and how to resolve them.

### 2. Include practical examples

Real-world examples that make implementation easier, for example:

```yaml
x-examples:
  valid-token:
    value: "AUTH-1.eyJhbGciOiJIUzI1NiJ9.dGVzdA.XYZ"
    description: Valid authentication token with prefix, payload, and signature
  expired-token:
    value: "AUTH-1.eyJleHAiOjE1MTYyMzkwMjJ9.abc"
    description: Example of expired token format
```

### 3. Document security considerations

Explain the key security features of authentication:

```yaml
x-security-considerations:
  replay-protection: >
    Each request includes a timestamp that must be within 5 minutes
    of server time to prevent replay attacks.
  credential-security: >
    Secret keys should never be transmitted in requests, only the
    signatures generated using those keys.
  token-revocation: >
    Tokens can be revoked through the /auth/revoke endpoint.
```

## Documenting Authentication Failure Responses

Include detailed error responses to help with troubleshooting:

```yaml
responses:
  "401":
    description: Authentication failed
    content:
      application/json:
        schema:
          type: object
          properties:
            error:
              type: string
              example: "invalid_signature"
            error_description:
              type: string
              example: "The provided signature doesn't match the calculated signature"
            auth_challenge:
              type: string
              description: Information to help retry authentication
```
