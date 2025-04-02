# Enums in OpenAPI

The OpenAPI Specification (OAS) version 3.x supports the `enum` (enumerated list) keyword for all `schemaObject` object properties, including parameters, request bodies, and responses. The OAS defines an `enum` according to the JSON Schema Specification. The `enum` keyword restricts the value of a JSON property to a fixed set of values. The value must be an array with at least one element and each element must be unique.

For example, the following code defines a property called `status` that must have a value of `pending`, `approved`, or `rejected`:

```json
{
  "type": "object",
  "properties": {
    "status": {
      "type": "string",
      "enum": ["pending", "approved", "rejected"]
    }
  },
  "required": ["status"]
}
```

Any JSON instance validated against this schema must have a `status` property with one of the three allowed values, case sensitive, or the validation will fail.

The `enum` keyword can be used with any JSON data type, including strings, numbers, objects, arrays, booleans, and the `null` type. The `enum` keyword is often used with the base `string` and `integer` types. The `boolean` type is constrained to `true` and `false` values and possibly `null` for a tri-state `boolean`. Using an `enum` with floating point number types typically doesn't make much sense.

Here is an OpenAPI schema defining a `status` parameter that must have a value of `pending`, `approved`, or `rejected`:

**YAML**

```yaml
parameters:
  status:
    in: query
    name: status
    required: true
    schema:
      type: string
      enum:
        - pending
        - approved
        - rejected
```

Any API request that includes this `status` parameter must have a value that is one of the three allowed values or the request will be rejected.

## Defaults

Use `default` to let clients omit a field when calling your service. For example, if a client orders a drink without specifying a cup size, they'll get a medium cup.

```yaml
openapi: 3.1.0
info:
  title: Bar API
  version: 1.0.0
paths:
  /orderDrink:
    post:
      operationId: orderDrink
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                cupSize:
                  type: string
                  enum:
                    - small
                    - medium
                    - large
                  default: medium
      responses:
        "200":
          description: Order placed successfully
```

If you use `default`, remember to omit `required: true` from the field.

## Enums With Names and Values

A common requirement using enums is to specify a human-readable name for the enum label and an integer for the enum value. For example, in C#:

```c#
public enum CupSize
{
    SMALL = 10
    MEDIUM = 20
    LARGE = 50
}
```

This is not possible using the `enum` keyword in OpenAPI, as OpenAPI enums allow only a list of values. If you want your schema's enums to have both names and values, you can combine `oneOf` and `const`. This works only in OpenAPI version 3.1 and later. OpenAPI version 3.0 does not support `const`.

Below is an example where a client can order a drink with one of three cup sizes:

```yaml
openapi: 3.1.0
info:
  title: Bar API
  version: 1.0.0
paths:
  /orderDrink:
    post:
      summary: Order a drink with a specified cup size
      operationId: orderDrink
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                cupSize:
                  $ref: "#/components/schemas/CupSize"
      responses:
        "200":
          description: Order placed successfully
components:
  schemas:
    CupSize:
      description: Size of the cup to order, represented by a code and label.
      oneOf:
        - description: Small cup size
          type: object
          properties:
            size:
              type: integer
              const: 10
            label:
              type: string
              const: "Small"
        - description: Medium cup size
          type: object
          properties:
            size:
              type: integer
              const: 20
            label:
              type: string
              const: "Medium"
        - description: Large cup size
          type: object
          properties:
            size:
              type: integer
              const: 50
            label:
              type: string
              const: "Large"
```

Below is an example call to this API:

```json
{
  "cupSize": {
    "size": 20,
    "label": "Medium"
  }
}
```

In this `oneOf` solution, the client has to supply the label and the value, defeating the purpose of using an enum, where the label serves as a human-readable alias for the actual value. This `oneOf` solution illustrates your options for including exact values. You'll need to decide in your design whether you want a simple `enum` or a more descriptive `oneOf`.

If you are using OpenAPI 3.0 or want to use `enum`, you can use an extension attribute to give labels to enum values. Different code generators and OpenAPI tools use different extension names. Below is an example using the Speakeasy extension field:

```yaml
components:
  schemas:
    CupSize:
      description: Size of the cup to order, represented by a numeric code with a corresponding label.
      type: integer
      enum:
        - 10
        - 20
        - 50
      x-speakeasy-enums:
        - Small
        - Medium
        - Large
```

Or you can use a simple text description to prioritize human understanding over tooling support:

```yaml
components:
  schemas:
    CupSize:
      type: integer
      enum:
        - 10
        - 20
        - 50
      description: Small Medium Large
```

## Constants for Single Value Enums

Before JSON Schema 2019 was included in OpenAPI 3.1, using an enum with a single value was the only way to specify a constant. If you are still using OpenAPI 3.0, the example below shows how to specify that a constant string is returned in a response:

```yaml
openapi: 3.0.0
info:
  title: Bar API
  version: 1.0.0
paths:
  /orderDrink:
    get:
      operationId: orderDrink
      responses:
        "200":
          description: Get a drink
          content:
            application/json:
              schema:
                enum:
                  - Here is your beverage
```

When using OpenAPI 3.1, you can use the `const` keyword whose name more clearly matches its intention than `enum` does:

```yaml
openapi: 3.1.0
info:
  title: Bar API
  version: 1.0.0
paths:
  /orderDrink:
    get:
      operationId: orderDrink
      responses:
        "200":
          description: Get a drink
          content:
            application/json:
              schema:
                const: Here is your beverage
```

## Nullable Enums

### OpenAPI 3.0

In OpenAPI 3.0 you can use the `nullable` keyword to specify `null` as an accepted value in an enum. In the example below, a client can order a drink with one of three cup sizes or no cup size specified at all:

```yaml
# !focus(6)
components:
  schemas:
    CupSize:
      description: Size of the cup to order, represented by a numeric code with a corresponding label.
      type: string
      nullable: true
      enum:
        - SMALL
        - MEDIUM
        - LARGE
```

### OpenAPI 3.1

OpenAPI 3.1 more closely aligns with the JSON Schema standard. As a result, the way to specify nullable types differs from OpenAPI 3.0. Instead of using the `nullable` attribute, OpenAPI 3.1 uses the JSON Schema approach with an array of types - including the `null` type. Here's the same example adapted for OpenAPI 3.1:

```yaml
# !focus(5,10)
components:
  schemas:
    CupSize:
      description: Size of the cup to order, represented by a numeric code with a corresponding label.
      type: [string, null]
      enum:
        - SMALL
        - MEDIUM
        - LARGE
        - null
```

## Open Enums

Traditionally enums are closed, meaning that only the values listed in the enum are allowed. In contrast, open enums allow additional values beyond those explicitly defined in the spec. Open Enums are useful when your API is evolving to support new use cases. In that scenario, you can let clients send values that aren't defined yet because their usage is on the edge of your API's capabilities.

OpenAPI 3.x currently does not natively support the description open enums directly. However, check if your tooling supports `x-` extension attributes. For example, [the Speakeasy extension `x-speakeasy-unknown-values`](/docs/customize-sdks/enums#open-vs-closed-enums) lets you define an enum with additional values beyond those listed.

```yaml
# !focus(6)
components:
  schemas:
    CupSize:
      description: Size of the cup to order, represented by a numeric code with a corresponding label.
      type: [string, null]
      x-speakeasy-unknown-values: allow
      enum:
        - SMALL
        - MEDIUM
        - LARGE
        - null
```

## Examples

Below is an example from the `components` of an API for ordering drinks showing all the different data types you can use with `enum`:

```yaml
components:
  schemas:
    Orders:
      type: object
      properties:
        cupSize:
          type: string
          enum:
            - small
            - medium
            - large
        sugarNumbers:
          type: integer
          enum:
            - 0
            - 1
            - 2
            - 3
        strength:
          type: number
          enum:
            - 0.25
            - 0.5
            - 0.75
            - 1.0
        decaffeinated:
          type: boolean
          enum:
            - true
            - false
        teaOrigin:
          type: object
          enum:
            - { country: India, region: Assam, address: { name: "The farm" } }
            - { country: China, region: Fujian }
            - { country: Japan, region: Shizuoka }
            - { country: Sri Lanka, region: Nuwara Eliya }
        sizeRange:
          type: array
          enum:
            - [1, 10]
            - [11, 20]
```

Date objects are not directly supported. Export your dates to ISO strings before using them in an API.

## Best Practices

Enums are simple, so there are only a few things to consider when using them in your schema:

- **Naming conventions**: Be consistent throughout your schema. If you use uppercase, like `NEW`, then stick to uppercase for all values in all enums.
- **Document values**: Ensure that your description field explains exactly what the purpose of each enum value is. If two values are similar, differentiate them carefully. A few extra explanatory lines in your schema can save you days of customer support queries.
- **Plan for extension**: Have you designed your schema and your server to easily adapt to adding new values to an enum? How much work will clients have to do to use the new values? What about removing values or renaming them? Consider how this affects the versioning of your API and you will explain it to clients.
- **Tool support**: Which tools, such as code generators, will you use with your schema? Do they support `enum` and `const`? Do they require extension attributes? Research this before writing your schema.
- **Default value**: Provide default values for enums with an obvious default, but avoid them where you need the client to consider their choice. For example, for an API that creates a web server, you would want the client to think carefully about the server size as it costs the client money. In comparison, operating system versions can default to the latest version without the same level of ramifications.
