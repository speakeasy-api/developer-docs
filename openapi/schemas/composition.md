---
title: Schema Composition
description: Best practices for describing boolean types in OpenAPI
---

# Using oneOf, anyOf and allOf

OpenAPI is built on top of JSON Schema, and JSON Schema has some brilliant keywords for handling various forms of composition. Schema composition is the concept of combining multiple schemas and "subschemas" in various ways to handle polymorphism, or “extending” other schemas to allow for reuse but also the sort of complex scenarios that evolve over time as an API evolves.

- **allOf:** All the subschemas must be valid.
- **anyOf:** One or more of the subschemeas must be valid.
- **oneOf:** Only one of the subschemas can be valid. Two would be too many.

All of these keywords must be an array, where each item is a schema. 

## oneOf

The `oneOf` keyword is used to specify that a value should match one of the given schemas exactly. It’s useful when you have different possible data structures or types for a particular field, like accepting bank account or card payments, or having train tickets and tram tickets, which are similar but a little different.

The validation will pass if the value matches exactly one of the schemas defined in oneOf.

This can be done for a single value:

```yaml
properties:
  created_at:
    oneOf:
    - type: string
      format: date-time
      examples:
      - '2025-04-07T11:45:28Z'
    - type: integer
      examples: 
      - 1744022728
```

JSON Schema, which OpenAPI schemas are based off, allow `oneOf` to be used for a single property, but `oneOf` can also be used with entire objects:

```yaml
properties:
  source:
    oneOf:
      - title: Card
        properties:
          number:
            type: string
          cvc:
            type: integer
          exp_month:
            type: integer
            format: int64
          exp_year:
            type: integer
            format: int64
        required:
          - number
          - cvc
          - exp_month
          - exp_year
      
      - title: Bank Account
        type: object
        properties:
          number:
            type: string
          sort_code:
            type: string
          account_type:
            type: string
            enum:
              - individual
              - company
        required:
          - number
          - account_type
```

In this example, the source property can be either a Card or a Bank Account. The validation will pass if the value matches exactly one of the schemas defined in `oneOf`. 

## anyOf

The `anyOf` keyword is similar to `oneOf`, but it allows for multiple valid options. The validation will pass if the value matches one or more of the schemas defined in `anyOf`.

This is useful when you want to allow for multiple valid types or structures, but you don’t want to restrict it to just one.

For example, if you want to allow a value to be either a string or an integer, you can use `anyOf`:

```yaml
anyOf:
  - type: number
    multipleOf: 5
  - type: number
    multipleOf: 3
```

In this example, the value can be either a number that is a multiple of 5 or a number that is a multiple of 3. The validation will pass if the value matches either of the schemas defined in `anyOf`.

## allOf

The `allOf` keyword can be used to combine multiple schemas into one. The validation will pass if the value matches all of the schemas defined in `allOf`. For an object, this means that the object must contain all of the properties defined in each of the schemas and the validations for each property must also pass.

```yaml
allOf:
  - type: object
    properties:
      name:
        type: string
  - type: object
    properties:
      age:
        type: integer
        minimum: 0
```

In this example, the value must be an object that contains both a `name` property of type string, and an `age` property of type integer with a minimum value of 0. 

# Composition with $ref

The `oneOf`, `anyOf`, and `allOf` keywords can be used with `$ref` to reference other schemas. This allows you to create complex schemas by combining existing ones, which is particularly useful for reusing common structures or validation rules.

For example, if you have a schema for a `PaymentMethod` and a schema for a `BankAccount`, you can use `$ref` to reference them in your schema:

```yaml
schema:
  oneOf:
    - $ref: '#/components/schemas/Card'
    - $ref: '#/components/schemas/BankAccount'
```

Due to the way `allOf` works, its possible to reference multiple schemas and require all of the validation rules and criteria to be met, providing a sort of merge-like functionality.

```yaml
schema:
  allOf:
    - $ref: '#/components/schemas/PaymentMethod'
    - $ref: '#/components/schemas/BankAccount'
```

This means that the value must match all of the schemas defined in `allOf`, which can be useful for creating complex validation rules or combining multiple schemas into one.

For example, if you have a schema for a `Booking` and you want to include a `links` property that references a `Links-Self` schema, you can use `allOf` to combine them:

```yaml
content:
  application/json:
    schema:
      allOf:
        - $ref: '#/components/schemas/Booking'
        - properties:
            links:
              $ref: '#/components/schemas/Links-Self'
```

This allows you to create a schema that includes both the properties of the `Booking` schema and the `links` property from the `Links-Self` schema, while still allowing for reuse and modularity in your API design.
