---
title: "Request Parameters Best Practices in REST API Design"
description: "Design intuitive, validated request parameters that make your API easy to use while preventing errors and security vulnerabilities."
---

# Sending request parameters

There are all sorts of options that can be sent to an API endpoint and figuring out where to put things can be tricky at first.

Let's look at the four options.

## Path Parameters

Given the URL `/collections/shoes/products?sort=date&size=10&color=red` the
"path" is the `/collections/shoes/products`, and slashes separate bits of a URL,
some of which are static and some are variables. In this example `shoes` is a
variable that could be swapped for another collection on the e-commerce store,
e.g: `hats`.

There is no concept of a "path parameter" in HTTP RFCs, this is purely a
convention, but it's common as API design terminology.

## Query Parameters

That same URL example has "query parameters" defined in the query string:
`/collections/shoes/products?sort=date&size=10&color=red`, which starts at, and
includes, the `?`: `?sort=date&size=10&color=red`.

This string can be parsed into `[sort: 'date', size: '10', color: 'red']`.

These options generally cover filtering, sorting, and pagination.

- Filtering: `?brand=Samsung&inStock=true`.
- Sorting: `?sort=date&sortBy=desc`.
- Pagination: `?page=2&limit=10` or `?cursor=abc123`.

They should never be used for anything destructive, or break the rules of the
method they're being used in (e.g. modify data on a GET), but they can have
other uses.

Some people use query strings for other purposes like changing the response data
that will come back, like using `GET /articles/123?include=comments` to squeeze
a bunch of comments data into the article response. This was considered best
practice in early 2010s but much like "image sprites" and "CSS combination" it's
now generally a bad practice, aided with improvements to HTTP/2 and HTTP/3.

Everything is a string because the whole URL is a string. Typed languages often
allow you to define types that these values should be converted to, so `size=10`
can become `10` instead of `"10"`, and `inStock=true` can become a proper `true`
instead of a literal string `"true"`.

**HTTP Headers**

HTTP Headers (also known as HTTP Header Fields) are metadata for a request, that
can have a wide variety of impacts across the API and various network components
along the way. You may have spotted this in the same code above.

```
Content-Type: application/json
```

That lets the API know that the message contains JSON.

```
Accept: application/json
```

That lets the API know we'd like JSON back too, if it can, we're ready for it.

```
If-Modified-Since: Wed, 30 Oct 2024 10:58:31 GMT
```

Only bother returning any data if its changed since then, otherwise just let us
know it's the same and save server resources.

These standard request headers are defined by Internet Engineering Task Force
(IETF) in [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110) and [RFC
9111](https://www.rfc-editor.org/rfc/rfc9111), and various other complimentary
RFCs. They cover an amazingly wide functionality set, including: authorization,
caching, CORS, security, redirects, compression, and localization.

You _can_ define your own headers, but it's important to avoid replicating
standard functionality with custom headers. People do odd things like the
`MyCompany-API-Key` when they could use the standard `Authorization` header.
Various network components like cache proxies will know what to do with an
`Authorization` and will respond accordingly (changing the way caching works to
avoid leaking data to others), but you will need to somehow teach those network
components what to do with a custom `MyCompany-API-Key`.

Custom headers should be limited to handy but non-vital information, like trying
out a new beta feature hiding behind a feature flag.

```
Acme-Feature-Toggle: beta-feature=true
```

For everything else, there's the request body.
