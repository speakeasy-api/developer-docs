# Using HTTP status codes

Arguments between developers will continue for the rest of time over the
exact appropriate code to use in any given situation, but these are the
most important status codes to look out for in an API, and their accepted meanings:

HTTP status codes can convey a lot of assumptions, but they cannot possibly
cover all situations, so it's important to add something for the human
developers to see what's wrong.

## 2XX is all about success

Whatever the client tried to do was successful, up to the point that the
response was sent.

* **200** - Generic everything is OK.
* **201** - Created something OK.
* **202** - Accepted but is being processed async (for a video means.
encoding, for an image means resizing, etc.).
* **204** - No Content but still a success. Used for a DELETE request, for example.

Example success response

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "user": {
    "id": 123,
    "name": "John Doe"
  }
}
```

## 3XX is all about redirection

These are all about sending the calling application somewhere else for the
actual resource. The best known of these are the `303 See Other` and the `301
Moved Permanently`, which are used a lot on the web to redirect a browser to
another URL. Usually a redirect will be combined with a `Location` header to
point to the new location of the content.

## 4XX is all about client errors

Indicate to clients that they did something wrong. They might have
forgotten to send authentication details, provided invalid data, requested a
resource that no longer exists, or done something else wrong which needs fixing.

There are a lot of status codes for client failures, but here are the most
common ones to be found see in API responses:

- *400 Bad Request* - The request was invalid or cannot be served. The exact error should be explained in the error payload.
- *401 Unauthorized* - The request requires an authentication token.
- *403 Forbidden* - The server understood the request, but is refusing it or the access is not allowed.
- *404 Not Found* - There is no resource behind the URI.
- *405 Method Not Allowed* - The request method is known by the server but has been disabled and cannot be used.
- *406 Not Acceptable* - The requested media type is not supported.
- *408 Request Timeout* - The server timed out waiting for the request.
- *409 Conflict* - The request could not be completed because of a conflict.
- *410 Gone* - The resource is no longer available and will not be available again.
- *412 Precondition Failed* - The server does not meet one of the preconditions that the requester put on the request.
- *413 Content Too Large* - The request body is larger than limits defined by server. The server might close the connection or return an `Retry-After` header field.
- *414 URI Too Long* - The URI requested by the client is longer than the server is willing to interpret.
- *415 Unsupported Media Type* - The request entity has a media type which the server or resource does not support.
- *416 Range Not Satisfiable* - The client has asked for a portion of the file, but the server cannot supply that portion.
- *417 Expectation Failed* - The server cannot meet the requirements of the `Expect` request-header field.
- *418 I'm a Teapot* - The Network Working Group were particularly bored one day and did an April fools joke.
- *429 Too Many Requests* - The user has sent too many requests in a given amount of time.

Example error response:

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "errors": [
    {
      "code": "VALIDATION_ERROR",
      "message": "Email address is not properly formatted",
      "field": "email"
    }
  ]
}
```

## 5XX is all about service errors

With these status codes, the API, or some network component like a load
balancer, web server, application server, etc. is indicating that something went
wrong on their side. For example, a database connection failed, or another
service was down. Typically, a client application can retry the request. The
server can even specify when the client should retry, using a `Retry-After` HTTP
header.

Key server error codes:

- *500 Internal Server Error* - The server has encountered a situation it doesn't know how to handle.
- *501 Not Implemented* - The request method is not supported by the server and cannot be handled.
- *502 Bad Gateway* - The server, while acting as a gateway or proxy, received an invalid response from the upstream server.
- *503 Service Unavailable* - The server is not ready to handle the request.
- *504 Gateway Timeout* - The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.

Example error response:

```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "errors": [
    {
      "code": "SERVER_ERROR",
      "message": "Something went wrong on our end"
    }
  ]
}
```

There are a whole bunch of HTTP status codes and it's not important to try and
use them all, but it is good to know what they are so the right one can be used
for the job.

To learn more about HTTP status codes, either read the [full list of status codes from the
IANA](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml),
or swing by [http.cats](http://http.cat/) and see what the cats have to say
about it.

## Best practices 

### Ambiguity in error code?

The `404` status code is drastically overused in APIs. People use it for "never
existed", "no longer exists", "you can't view it" and "deactivated", which is
way too vague. That can be split up into `403`, `404` and `410` for different
meanings.

If you get a `403`, this could be because the requesting user is not in the
correct group to see the requested content. Should the client suggest you
upgrade your account somehow? Are you not friends with the user whose content
you are trying to view? Should the client suggest you add them as a friend?

A `410` on a resource could be due to the resource being deleted, or it could be
due to the user deleting their entire account.

Sometimes being more specific about these different use-cases can help, but
sometimes it can leak sensitive information. For example, GitHub prefer to
return a `404` for a private repository that you do not have access to, instead of
a `403`, because a `403` would confirm the existence of the repository. You maybe
don't want people knowing that github.com/acme/your-secret-repo exists, so it's
better to not give out any hints.
