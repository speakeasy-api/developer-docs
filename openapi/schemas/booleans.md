---
title: Booleans in OpenAPI best practices
description: Best practices for describing boolean types in OpenAPI
---
# booleans

The boolean type is simple; it represents either **true** or **false**. Be aware that it doesn't support other truthy/falsy values like: **1** or **0**, an empty string “” or **null**. It has no additional attributes to control its format or validation.

```yaml
# A boolean type
schema:
    type: boolean
```
