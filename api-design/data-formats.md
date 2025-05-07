---
title: "Data Formatting Best Practices in REST API Design"
description: "Use data formats in your API with best practices for security, performance, and reliability across different client platforms."
---

# Formatting API data

A request body (and a response body) will have a `Content-Type`, and that
content type will tell tools how the data is formatted so it can be converted
into something meaningful in whichever programming language is being used.

## JSON: The Modern Standard

JSON has become the de facto standard for API requests because it:

- Supports native data types (numbers, booleans, null)
- Allows nested structures
- Is human-readable
- Has excellent tooling support

Example of complex JSON request:

```json
{
  "place": {
    "name": "Central Park",
    "location": {
      "lat": 40.785091,
      "lon": -73.968285
    },
    "features": ["park", "landmark"],
    "isAccessible": true,
    "capacity": null
  }
}
```

## XML: Ye Oldé Standard

Any modern API will support JSON. Occasionally they will support XML as well.

XML is a relic of the early internet. It dominated web APIs in the 2000s with
standards like SOAP and XML-RPC, but was largely displaced by JSON in the 2010s
due to JSON's simplicity and natural fit with JavaScript. Today, XML persists
mainly in legacy systems, enterprise SOAP services, and specific domains like
publishing (DocBook), feed syndication (RSS/Atom), and configuration files
(Maven, Android manifests).

JSON is a lot easier to work with than XML, and it is a lot easier to read. It
is also more compact, which is important when sending data over the wire.

An example of a bunch of different data types in JSON.

```json
{
  "place": {
    "id": 1,
    "name": "This is a bunch of text.",
    "is_true": false,
    "maybe": null,
    "empty_string": ""
  }
}
```

This same data in XML.

```xml
<places>
    <place>
        <id>1</id>,
        <name>This is a bunch of text.</name>
        <is_true>0</is_true>
        <maybe />
        <empty_string />
    </place>
</places>
```

Basically, in XML, _everything_ is considered a string, meaning integers,
booleans, and nulls can be confused. Both `<maybe />` and `<empty_string />`
have the same value, because there is no way to denote a `null` value either.
Gross.

## Form Data: Legacy Format

Form Data uses the `application/x-www-form-urlencoded` mime type, and is helpful
when accepting web forms from a browser using the `<form>` HTML tag. This was
very popular decades ago, but with modern web applications using more
single-page applications (SPAs) and mobile apps to speak JSON natively, it is
something most people just don't bother with anymore.

It's not just that it's old, it's cumbersome to work with, and suffers from a
lack of data types like XML but with even more awkward syntax.

Everything is a string. To handle a boolean a client has to send `1` or `0`,
which will be read as `"1"` or `"0"`. Some would suggest sending `property=true`, but that is
a literal `"true"` string which can be confusing to deal with.

```http
POST /checkins HTTP/1.1
Host: api.example.org
Content-Type: application/x-www-form-urlencoded

place_id=1&message=This%20is%20a%20bunch%20of%20text.&with_friends[]=1&with_friends[]=2&with_friends[]=3
```

This is a bit of a mess, as the message needs to be "URL encoded" and the
`with_friends` is an array with awkward syntax. On top of that it's not clear
what the data types are. It is also a bit of a pain to work with on the
server-side, as the data needs to be parsed and split up properly, then converted
to the correct data types.

For comparison, the same data in JSON is a lot easier to work with.

```http
POST /checkins HTTP/1.1
Host: api.example.org
Content-Type: application/json

{
  "place_id": 1,
  "message": "This is a bunch of text.",
  "with_friends": [1, 2, 3]
}
```

This is a JSON object, and it is easy to see what is going on. The `place_id` is
an integer, the `message` is a string, and `with_friends` is an array of
integers.

## Multipart Form Data: An Occasionally Helpful Nightmare

Multipart forms are a way to send data in multiple parts as a single HTTP request, often used in REST APIs for handling mixed types of data, such as JSON and binary files (e.g., images or documents). Unlike standard form submission, where data is encoded as application/x-www-form-urlencoded, multipart forms use the multipart/form-data encoding, which allows for the inclusion of both text and file content in the same request.

This is particularly useful for endpoints that need to process metadata (e.g., JSON) alongside uploaded files. Each part of the form is separated by a boundary string and includes headers that describe the content type and disposition of the part.

```http
POST /checkins HTTP/1.1
Host: api.example.org
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="metadata"
Content-Type: application/json

{
  "place_id": 1,
  "message": "This is a bunch of text.",
  "with_friends": [1, 2, 3]
}
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="example.jpg"
Content-Type: image/jpeg

[Binary data of the image file]
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

This is either confusing or brilliant depending on perspective, but it's
generally a massive pain to work with.

## Best Practices

### 1. Stick to JSON wherever possible

Work out which content type (or types) are actually needed, and _stick to that_.
95% of the time, that's JSON.

Some want to add CSV or HTML "just in case", and others want to add all the fun
new formats like BSON or MessagePack because they're "quicker" (without doing
basic optimizations on their code/database which would likely yield more
meaningful performance gains). That might be a bit of fun, but it's all adding a
maintenance burden and expecting too much of clients.

Start with JSON and wait for a big client to ask for a specific format, then
weigh it up against the cost of supporting it.

### 2. Avoid multipart forms

There are a few reasons to avoid this. It's hard to document, weird to handle
partial errors, and generally confuses beginners trying to work with an API.

An SDK can hide some of the complexity, but that won't solve the awkward race
conditions that pop up creating something from the first "part", then the second
or third part fails, rolling back database transactions after emails have
already gone out.

Designing an API for the least experienced user is not necessarily the goal, but
making things unnecessarily complex isn't the plan either, so stick with "one
endpoint does one thing". File uploads can be handled with other more targeted
endpoints.
