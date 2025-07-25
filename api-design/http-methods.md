---
title: "HTTP methods Best Practices in REST API Design"
description: "Design intuitive, validated request bodies that make your API easy to use while preventing errors and security vulnerabilities."
---

# Using HTTP methods

We learned about URLs in _[What is a URL?](/api-design/urls)_ which is how an
API defines its "resources". If an API request were a sentence, the URL would be the noun. In this section, we'll cover the verbs of API requests: HTTP methods.

```curl
GET /places?lat=40.759211&lon=-73.984638 HTTP/1.1
Host: api.example.org
```

Sometimes people will suggest HTTP methods are optional, or that they're just noise, and everything would be better off done as purely a `GET` or `POST`. This is a bit of a misunderstanding of how HTTP works, and how the web works, and leads to all sorts of trouble down the line.

Conventions may seem arbitrary, but they are important to follow because **your API does not exist in a vacuum**. Conventions allow disparate tools that do not have direct knowledge of each other to work together seamlessly. If you start breaking these conventions, you're going to need to build all of your own tools, and that's a lot of work.

With that in mind, let's dive into the core HTTP methods and best practices for using them in your API.

## `GET`: Fetching Resources

`GET` is the most common HTTP method, and is used for fetching data. It is the
default method for most browsers, as it is used for fetching web pages, images,
stylesheets, and scripts. It is also used for fetching data from APIs.

`GET` is "idempotent", meaning that if you made the same get call over and over
again, you can expect the same outcome every time. If you `GET` the resource, but the request fails or times out, and you `GET` it again, the end result is that you got it. Nothing was deleted, or removed, or changed in any lasting way, so if this thing is got a bunch of times it is the same as being got once.

```curl
GET /places?lat=40.759211&lon=-73.984638 HTTP/1.1
Host: api.example.org
```

### Best Practices for `GET` requests

- Idempotent: Identical requests get identical outputs.
- No request body: `GET` requests can _technically_ have a body, but a lot of frameworks and tooling will start acting a bit wonky, so just avoid it. There's almost always a better way to do what you're trying to do.
- Caching: You can and should enable caching for the response of `GET` requests, but you need to be careful about how you do it. If the data changes frequently, you might want to set a short cache time, or use a cache-busting technique.
- Safe: `GET` requests should not change the state of the server. They should only be used to retrieve data.

## `POST`: Creating Resources

`POST` requests are typically used for creating new resources or triggering actions that change server state. Unlike `GET`, `POST` is not idempotent - sending the same POST request multiple times may create multiple resources or trigger multiple actions.

`POST` does not necessarily have to represent a resource creation. You could use to signify the triggering of an event: the sending of an email, paying an invoice, etc. But it should result in that action being executed every time you make a request.

### `POST` examples

Creating a new location resources:

```curl
POST /places HTTP/1.1
Host: api.example.org
Content-Type: application/json

{
  "name": "High Wood",
  "lat": 50.464569783,
  "lon": -4.486597585
}
```

Triggering an email send:

```curl
POST /emails/send HTTP/1.1
Host: api.example.org
Content-Type: application/json

{
  "to": "Phil",
  "subject": "Hello",
  "body": "Hi Phil, how are you?"
}

```

### Best Practices for `POST` requests

- Not idempotent
- Includes a request body
- Cannot be cached by default
- Used for resource creation and non-idempotent actions

## `PUT`: Complete Resource Updates

Often incorrectly associated with being an "edit" action, PUT is designed for idempotent updates where the request contains the complete resource representation. This means that if you `PUT` the same data multiple times, the resource will be in the same state each time.

Some developers get hung up about is this a "create or update" action. Their concern comes from a misplaced sense that HTTP verbs should correspond to a specific CRUD (create, read, update, delete)action. That is not the case. `PUT` is the REST equivalent of an upsert operation in a database. If the resource exists, it will be updated. If it does not exist, it will be created.

### `PUT` examples

An example of this would be an image upload. An API might have the ability to
upload an image for a user, which is probably a profile image. A request with
`PUT /users/jane/image` and a body of the image contents (or a JSON
payload with a URL) could then provide the image. It does not matter if the user
already had an image or not, if the request is a success they will have one. If
the upload fails that is fine, another request can be made, and it will be
overridden.

```curl
PUT /users/jane/image HTTP/1.1
Host: api.example.org
Content-Type: image/jpeg

[Binary image data]
```

### Best Practices for `PUT` requests

- Idempotent: Multiple identical requests result in the same final state
- Complete resources: Must include the complete resource representation
- Treat as upsert: Can create or update resources
- Useful for uploads and full resource replacements

## `PATCH`: Partial Resource Updates

`PATCH` allows clients to send partial modifications to a resource. Unlike `PUT`, which requires sending the complete resource, `PATCH` only needs to contain the changes to be applied.

`PATCH` is not idempotent, so if you `PATCH` a resource, and the request
fails, you cannot just retry the request as you could with a `PUT`. The server
might have already made some changes, and retrying the request could result in a
different outcome.

```curl
PATCH /users/phil

{
  "image_url": "https://cdn.example.org/fancy-headshot.png"
}
```

How exactly PATCH works can vary depending on which data format you're using. If it's `JSON` then there are two popular approaches: [JSON Patch](https://tools.ietf.org/html/rfc6902) and [JSON Merge Patch](https://tools.ietf.org/html/rfc7396).

JSON Merge Patch is what most people will want to use for general APIs, as it is
simple to use.

### `PATCH` Example

```json
{
  "title": "Goodbye!",
  "author" : {
    "givenName" : "John",
    "familyName" : "Doe"
  },
  "tags":[ "example", "sample" ],
  "content": "This will be unchanged"
}
```

A user agent wishing to change the value of the "title" member from
"Goodbye!" to the value "Hello!", add a new "phoneNumber" member,
remove the "familyName" member from the "author" object, and replace
the "tags" array so that it doesn't include the word "sample" would
send the following request:

```http
PATCH /my/resource HTTP/1.1
Host: example.org
Content-Type: application/merge-patch+json

{
  "title": "Hello!",
  "phoneNumber": "+01-123-456-7890",
  "author": {
    "familyName": null
  },
  "tags": [ "example" ]
}
```

The resulting JSON document would be:

```json
{
  "title": "Hello!",
  "author" : {
    "givenName" : "John"
  },
  "tags": [ "example" ],
  "content": "This will be unchanged",
  "phoneNumber": "+01-123-456-7890"
}
```

### Best Practices for `PATCH` requests

- Not idempotent
- Contains only the fields to be modified
- More flexible than PUT for updates
- Supports different patch formats (JSON Patch, JSON Merge Patch)

## `DELETE`: Removing Resources

Aptly named, the `DELETE` method is used to remove resources from the system. It's intended to be idempotent because deleting a resource multiple times should have the same effect as deleting it once. However, some APIs do not implement it that way so a second attempt to delete the same thing will get a 404. This is not ideal, but it is common.

### `DELETE` Example

```curl
DELETE /places/123 HTTP/1.1
Host: api.example.org
```

### Best Practices for `DELETE` requests

- Keep delete idempotent.
- Usually doesn't include a request body
- Should return appropriate status codes (204 No Content or 200 OK)

## Less Common HTTP Methods

While most APIs primarily use GET, POST, PUT, PATCH, and DELETE, several other HTTP methods serve specific purposes:

### HEAD

- Identical to GET but returns only headers, no body
- Perfect for checking if a resource exists or has been modified
- Useful for validating links or checking file sizes before download

Example:

```http
HEAD /articles/123 HTTP/1.1
Host: api.example.org

HTTP/1.1 200 OK
Last-Modified: Wed, 15 Oct 2024 12:00:00 GMT
Content-Length: 12345
```

### OPTIONS

- Returns information about available communication options
- Most commonly used for CORS preflight requests
- Can provide information about allowed methods

Example:

```http
OPTIONS /api/articles HTTP/1.1
Host: api.example.org

HTTP/1.1 200 OK
Allow: GET, POST, HEAD, OPTIONS
Access-Control-Allow-Methods: GET, POST
```

### TRACE

- Used for diagnostic purposes
- Returns the exact request received by the server
- Helpful for debugging proxy issues
- Often disabled for security reasons

### CONNECT

- Used to establish tunnel connections through HTTP proxies
- Primarily used for HTTPS connections through proxies
- Rarely implemented in standard APIs

These methods are less frequently used but can be valuable for specific use cases like debugging, CORS handling, and proxy management.

## Best Practices

### 1. Use Methods as Intended

Don't force everything through POST or GET. Each method has its purpose:

- GET for retrieval
- POST for creation and non-idempotent actions
- PUT for complete resource replacement (upsert)
- PATCH for partial resource updates
- DELETE for removal

### 2. Consider Caching Implications

- GET requests should be cacheable when appropriate
- Include proper cache headers
- Ensure POST, PUT, PATCH, and DELETE invalidate caches as needed

### 3. Handle Race Conditions

With `PUT` & `PATCH` requests, be aware of potential race conditions:

```
# Client A reads resource
GET /resources/123

# Client B reads resource
GET /resources/123

# Client B's update overwrites A's changes
PUT /resources/123 {...}

# Client A updates resource
PUT /resources/123 {...}
```

Both clients were trying to update a single instance of a resource, but little do they know they are overwriting one another. This is on the server to handle, and there are a few ways to do it.

- Use timestamps for last modified
- Use optimistic locking with version numbers
- Implement ETags for concurrent updates

### 4. `PUT` vs. `PATCH`

Oftentimes an API will only support one of these methods. We **strongly** recommend supporting both, unless you have a very specific reason not to. `PUT` is great for full updates, but `PATCH` is more flexible and can be more efficient for partial updates.

## Remember

HTTP methods aren't just syntax - they're core to how the web works. Using them correctly makes your API:

- More predictable for clients
- Easier to cache
- Compatible with existing tools
- Easier to maintain and scale

Your choice of HTTP method communicates intent and behavior to both developers and tools, so choose wisely and consistently.
