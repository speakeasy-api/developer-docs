---
title: "Collections Best Practices in REST API Design"
description: "Best practices for organizing and returning resources and collections in your REST API with practical examples and implementation patterns."
---

# Returning resources & collections of data

In the context of REST/HTTP APIs, a resource represents a specific piece of data or object that can be accessed via a unique URI (Uniform Resource Identifier). This could be anything: a user, a blog post, a product, or an order. Whereas a collection is a group of resources. It's a list or set of all the items of a particular type.

## Structuring URLs for resources & collections

Retrieval of resources and collections both use the `GET` operation. Established convention is to have a unique base URL for each type of resource in an API: `/invoices`, `/transactions`, etc.

To retrieve the entire collection of resources, a `GET` request is made to that URL: `GET /invoices`.

```http
GET /invoices
```

```json
[
  {
    "id": "645E79D9E14",
    "invoiceNumber": "INV-2024-001",
    "customer": "Acme Corporation",
    "amountDue": 500.00,
    "dateDue": "2024-08-15"
  },
  {
    "id": "646D15F7838",
    "invoiceNumber": "INV-2024-002",
    "customer": "Monsters Inc.",
    "amountDue": 750.00,
    "dateDue": "2024-08-20"
  }
]
```

To retrieve a specific resource within that collection, a slightly different
endpoint exists: `GET /invoices/645E79D9E14`. In this case, the ID `645E79D9E14`
is a unique identifier for a specific invoice.

```http
GET /invoices/645E79D9E14
```

```json
{
  "id": "645E79D9E14",
  "invoiceNumber": "INV-2024-001",
  "customer": "Acme Corporation",
  "amountDue": 500.00,
  "dateDue": "2024-08-15",
  "dateIssued": "2024-08-01",
  "items": [
    {
      "description": "Consulting Services",
      "quantity": 10,
      "unitPrice": 50.00,
      "total": 500.00
    }
  ],
  "links": {
    "self": "/invoices/645E79D9E14",
    "customer": "/customers/acme-corporation",
    "payments": "/invoices/645E79D9E14/payments"
  }
}
```

The resource contains loads of data, including the customer name, an array of
items on the invoice, various dates, and how much of the invoice is left to be
paid.

It also has `"links"`, which can be related resources, collections, which could
be related data, or could be available actions foe the resource. For example, a
`"pay"` link which signals a payment can be made, a `"send"` link which helps
consumers send an invoice, or the example here which contains a `"payments"`
link to also allows for payments to be made, but also supports viewing a list of
partial and failed payments.

## What is a collection

A collection can be considered a special type of resource, which is a list of a
specific type of resource. For example, a collection of invoices, a collection
of products, or a collection of users.

Usually the API returns some basic information about each resource in the
collection, like title, id, and the sort of information an application might
want to show on a webpage showing the list. Then the links allow a client to
load up more data for each resource it's interested in.

## How do HTTP methods fit in

REST APIs typically use standard HTTP methods to interact with resources and
collections:

**GET:** Retrieve data.

- `/posts` - Get a collection of all blog posts.
- `/posts/abc1` - Get a single blog post by its ID.

**POST:** Create a new resource.

- `/posts` - Add a new blog post to the collection.

**PUT:** Replace an entire existing resource.

- `/posts/abc1` - Update the blog post with ID abc1.

**PATCH:** Update part an existing resource.

- `/posts/abc1` - Update the blog post with ID abc1.

**DELETE:** Remove a resource.

- `/posts/abc1` - Delete the blog post with ID abc1.

APIs are about a whole lot more than just CRUD, but when thinking about
collections and resources this is a simple way it really helps to think about
how these operations map to the data and actions available.

## Best practices

### URI structure

The structure of URIs in REST APIs is crucial for consistency and readability.
Here are some common conventions.

**Nouns over Verbs**: URIs typically use nouns (like /posts) rather than verbs
(like `/getPosts`), because HTTP methods (GET, POST, etc.) already imply the
action.

**Pluralization:** Collections are usually plural (e.g.: `/posts`), while
resources are identified with a unique identifier (e.g.: `/posts/abc1`).

**Minimal Data in Collections:** When retrieving a collection, APIs often return
minimal information about each resource to save bandwidth and speed up
responses. This allows consumers to quickly scan the collection and then retrieve more
detailed information if needed.

```http
GET /posts
```

``` json
[
    {
        "id": "abc1",
        "title": "Understanding REST APIs",
        "author": "Bob Doe",
        "link": "/posts/abc1"
    },
    {
        "id": "def2",
        "title": "Introduction to HTTP Methods",
        "author": "Sally Smith",
        "link": "/posts/def2"
    }
]
```

There's plenty of debate about how much detail to put in collections and how
much to put in resources, but the key is to keep it simple and consistent.

Putting everything in the collection would bloat the list view horrendously,
wasting time, money, and carbon emissions stressing the infrastructure passing
around massive JSON payloads with content that may not even be needed right now.

Trimming them down to a bare minimum could then force consumers to make an
unreasonable number of requests to get even the most basic data.

Some API designers go as far as putting no information at all in their
collections, because it can all be fetched directly from the resources. This
helps make the responses a lot more [cachable](/api-design/caching) because if
any of the data does change for any of the resources then the collections do not
need to be purged from the cache to maintain consistency.

```http
GET /posts
```

```json
[
    {
        "link": "/posts/abc1"
    },
    {
        "link": "/posts/def2"
    }
]
```

There is no one simple answer here, but using a bit of common sense and talking
to consumers about their use cases should usually help find the right balance.

In general, it's a sensible default to aim for a reasonable middle-ground, where
summary data is in the collection: name, ID, status, and a few key bits of
data that consumers are the most likely to need when they're building an index of data.

Then if consumers need more data, they can go fetch it, and with modern day
HTTP/2 & HTTP/3 this does not have as many performance burdens as it used to.
Especially when API caching is implemented with quality API design then slimming down collections can
even lead to better performance than trying to squash everything into the collection.

### Linking to related resources

Collections linking to resources is helpful, letting clients follow various
links throughout an API like a user browsing a website. Resources can link
to other related resources and collections, which might be data but could also
be considered "actions", all handled through the same conventions.

```http
GET /posts/abc1
```

```json
{
    "id": "abc1",
    "title": "Understanding REST APIs",
    "author": "Jane Doe",
    "content": "This is a detailed tutorial on REST APIs...",
    "datePublished": "2023-10-01",
    "links": {
        "self": "/posts/abc1",
        "author": "/authors/jane-doe",
        "comments": "/posts/abc1/comments"
    }
}
```

In this response:

- The `self` link points to the resource itself, like a canonical URL, which is
  a handy convention for knowing where something came from, whether that's a
  JSON blob that has been saved in a database without the headers, or providing
  one location to call back to if this was a temporary action which cannot be
  repeated.

- The `author` link points to the resource representing the author of the post
  because it's quite likely clients will want to load that. Nobody will need to
  load every author for every post because HTTP caching will kick in, and makes
  no sense to squash that data into the post resource.

- The `comments` link points to a collection of comments related to this post if
  consumers want to load that, and any application loading that up is going to want to
  do it after it's got the post showing to users, so it doesn't matter if it
  loads later.

Splitting up API data into multiple endpoints that can be grabbed if needed is
really handy, upgrading a REST API from basically a set of functions which grab
some data, into an Object-Relational Mapping (ORM) where relationships can be
navigated easily, but going one step further and focusing on actions turns the API into
essentially a state machine over HTTP.

## Don't confuse resource design & database design

A key aspect of API design is not tying API resources and collections directly
to the underlying database. Database needs to change and adapt rapidly as data
structures change, but APIs needs to evolve slowly (or not at all).

The more tied an API becomes to an internal database structure, the more they're
going to more often API consumers are going to have to rewrite their
applications.

**Normalization will change over time:** An invoice resource might contain a
`customer` object, even though it is in a separate database table. That could be
INNER JOIN'ed in the background (for those using SQL). Then if that query starts
to get really slow, the database could reduce the level of normalization and
bring that customer name directly into the `invoices` table (which is going to
help maintain proper historical accuracy if the customer changes their name).

**There could be pivot tables involved which don't need to be exposed:** Linking
tree planting `sites` to all of the tree `species` might involve a
`sites_species` database but that doesn't mean the API should have a
`/sites_species` table.

There's lots to think about, but the quick point here is to avoid letting
database design influence resource design too heavily. Clients should always
come first.

## Real-World Examples

**GitHub API**

When retrieving a list of repositories, each repository item includes a url
field that links to the full details of that repository.

```http
GET /users/octocat/repos
```

```json
[
  {
      "id": 1296269,
      "name": "Hello-World",
      "url": "https://api.github.com/repos/speakeasy-api/Hello-World"
  }
]
```

**Twitter API**

When retrieving a user's timeline, each tweet includes a URL that links to the specific tweet details.

```http
GET /statuses/user_timeline.json?screen_name=speakeasydev
```

```json
[
  {
      "created_at": "Wed Oct 10 20:19:24 +0000 2018",
      "id": 1050118621198921728,
      "text": "Just setting up my Twitter. #myfirstTweet",
      "url": "https://api.twitter.com/1.1/statuses/show/1050118621198921728.json"
  }
]
```

**Stripe API**

Stripe has a collection which is a bit different, instead of returning a JSON array directly in the response, it wraps it in an object with a data property:

```http
GET /v1/charges
```

```json
{
  "object": "list",
  "url": "/v1/charges",
  "has_more": false,
  "data": [
    {
      "id": "ch_3MmlLrLkdIwHu7ix0snN0B15",
      "object": "charge",
      "amount": 1099,
      "amount_captured": 1099,
      "amount_refunded": 0,
      "application": null,
      "application_fee": null,
      "application_fee_amount": null,
      "balance_transaction": "txn_3MmlLrLkdIwHu7ix0uke3Ezy",
      "billing_details": {
        "address": {
          "city": null,
          "country": null,
          "line1": null,
          "line2": null,
          "postal_code": null,
          "state": null
        },
        "email": null,
        "name": null,
        "phone": null
      },
      "calculated_statement_descriptor": "Stripe",
      "captured": true,
      "created": 1679090539,
      "currency": "usd",
      "customer": null,
      ... snip because its HUGE...
    }
    {...}
    {...}
  ],
}
```

They do this so they can add in various other bits of metadata, but much of this
metadata comes down to pagination which can be handled other ways (like popping
pagination into Links headers), so this practice is somewhat dying out.

## Best Practices

Returning resources and collections in a logical and consistent way is tough at
first, but there are standards and best practices that can help avoid common
mistakes.

### Using a "Data Envelope"

One common convention used by many popular APIs (like the Stripe example above)
is to wrap data in some sort of "envelope", which is a common term for putting
it into another object so there's a bit of room for metadata.

```json
{
  "data": [
    {
      "id": 123,
      "name": "High Wood",
      "lat": 50.4645697,
      "lon": -4.4865975
      "created_at": "2022-10-24T12:00:00Z"
    },
    {
      "id": 456,
      "name": "Goytre Hill",
      "lat": 52.1356114,
      "lon": -3.5975258
      "created_at": "2024-12-01T09:00:00Z"
    }
  ],
  "meta": {
    "rate-limit": 100,
    "next": "/places?page=2"
  }
}
```

This was really popular for a long time, but we don't need to do this anymore,
because most of that metadata would be better off in a response header.

The move to headers may in part be down to HTTP/2 adding [HPAK header
compression](https://blog.cloudflare.com/hpack-the-silent-killer-feature-of-http-2),
meaning it is more efficient to use headers for anything that's sensible to use
them for, and more standards are popping up to move these concepts out of custom
implementations in JSON and elsewhere, and move them into headers.

For example, instead of putting rate limiting data into `meta`, the [`RateLimit`
header](https://www.ietf.org/archive/id/draft-ietf-httpapi-ratelimit-headers-08.html),
can be used, and instead of putting `pagination` into the response, why not use
the `Links` header.

```http
HTTP/2 200 OK
Content-Type: application/json
Cache-Control: public, max-age=18000
RateLimit: "default";r=100;t=60
Link: <https://api.example.com/places?page=1&size=10>; rel="first",
      <https://api.example.com/places?page=3&size=10>; rel="next",
      <https://api.example.com/places?page=100&size=10>; rel="last"

[
  {
    "id": 123,
    "name": "High Wood",
    "lat": 50.4645697,
    "lon": -4.4865975
    "created_at": "2022-10-24T12:00:00Z"
  },
  {
    "id": 456,
    "name": "Goytre Hill",
    "lat": 52.1356114,
    "lon": -3.5975258
    "created_at": "2024-12-01T09:00:00Z"
  }
]
```

This probably looks easier to work with in some ways, and harder to work with in
some ways, but it's more performant, and any complexity can be deferred to
standard libraries and packages which handle all of this for API consumers
automatically.

### Data Format Standards

Instead of creating custom formats it may be easier for API developers and
consumers alike to use an existing "data format" standard.

- [CollectionJSON](http://amundsen.com/media-types/collection/format/)
- [HAL](http://stateless.co/hal_specification.html)
- [JSON:API](https://jsonapi.org/)
- [OData](https://www.odata.org/)
- [Siren](https://github.com/kevinswiber/siren)

Using any of these can avoid the "bikeshedding" (arguments about pros and cons
of each minor choice), and more importantly it will open the doors to more
standard tooling on both the client-side and server-side.

## Summary

**Use Consistent Naming:** Stick to conventions like using plural nouns for
collections. It shouldn't matter, but it drives people mad.

**Keep it Simple:** Start with basic endpoints and add complexity only when
necessary. It's easier to add things to an API if they're needed later, than
take them away once they're in production.

**API model is not a database model:** Do not try and recreate the database
model over HTTP because it will be a big waste of time, and be almost
immediately wrong anyway, which will make clients upset.
