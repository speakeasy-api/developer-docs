---
title: "Security Best Practices in REST API Design"
description: "Implement robust security measures in your API to protect sensitive data, prevent unauthorized access, and comply with regulatory requirements."
---

# Designing for API security

Creating an API is like opening a door to the outside world. Who is allowed
through, what they can carry, and where they're allowed to go is incredibly
important. In this guide we'll see how design choices made early on impact the
security of an API once it's built. 

Many API security problems come down to coding errors or misconfigured
infrastructure, but this guide focuses more on the foundational API design
decisions that effect the security of an API from day one.

## Why care about API security

APIs often protect sensitive data or critical functionality. Whether it's a
payment gateway, a medical records system, or a social media app, an API needs
to be designed with security in mind to protect both the organization and its
users.

API security breaches in 2022 caused losses worth [$12–$23
billion](https://www.darkreading.com/application-security/api-security-losses-billions-complicated)
in the US and [$41–$75 billion
globally](https://techwireasia.com/2022/06/api-vulnerabilities-costing-businesses-up-to-us75-billion-annually/).

To pick just a few examples, since the introduction of General Data Protection
Regulation (GDPR), Amazon Europe were fined €746m in 2021, Meta was fined €1.2bn
in 2023, and - to show it's not just tech giants - Marriott International (a
hotel chain) got stuck with a £20m fine in 2022.

More countries and regions strengthening privacy laws along the lines of GDPR:
California Consumer Privacy Act (CCPA), Canada's Personal Information Protection
and Electronic Documents Act (PIPEDA), and Brazilian General Data Protection Law
(LGPD).

Even if data breaches and leaks don't result in hefty fines, the reputational
damage that comes with leaking customers private information can be a big issue,
so it's important to do everything possible to keep APIs secure.

Let's walk through some key security concepts in API design to see how
decisions can make or break an API's defenses before it's even built.

## Principle #1: Design with the least privilege

**Every API consumer should only have access to what they need and nothing more.**

Imagine designing an API for an e-commerce platform. A customer should be
able to view their order history, but not other customers' orders. 

Similarly, a "staff" user might need access to refund functionality but shouldn't
necessarily see sensitive payment details. 

**What Could Go Wrong**: Failure to verify this could lead
to Insecure Direct Object References (IDOR), a common flaw where attackers can
manipulate identifiers to access data they shouldn't.

**Design Decision**: The first issue to make sure endpoints are protected with
access controls, restricting the the specific user, or to a user with the right
role.

```http
GET /orders/{orderId}
Authorization: Bearer {access_token}
```

The application should verify that the `orderId` belongs to the authenticated
user, unless the user has a role like `admin`. 

Refund logic and payment details can be split onto their own endpoints:

```http
POST /orders/{orderId}/refund
Authorization: Bearer {staff_access_token}
```

```http
GET /orders/{orderId}/payments
Authorization: Bearer {admin_access_token}
```

This allows staff handle refunds, but does not leak sensitive credit card
information to as many people within the company, whilst still making it
possible to escalate customer problems to a higher access user. 

Better yet, **the payments collection is not even on the API**, it's something only
viewable in an admin backend system thats protected with a firewall and VPN.

## Principle #2: Always validate input

**Inputs should be treated as untrusted, even if the API is "internal" or
"private".**

Any incoming API traffic could be compromised in some way, even if it's
considered to be a trusted source. 

An API could suddenly become public: either intentionally when infrastructure
teams move things around, or accidentally when somebody de-compiles an iOS
application or sniffs traffic to find an API that people thought was hidden. 

Even if an API is firewalled off from public traffic, another API or service
could have been hacked giving them access to the protected API.

It's best to treat everyone with suspicion, and validate all inputs as strictly
as possible. 

**What Could Go Wrong**: Malicious data could be introduced, or private
information leaked, leading to any number of issues. People could delete invoice
payment records and updating payment details to trigger a second payment to the
wrong person. They could change passwords for users so they can log in as them
to access information and processes not even available in the API.

**Design Decision**: Set strict rules for which properties are editable, which
can be returned, and set strict validation rules for these properties. 

This can be described in OpenAPI early on utilizing `readOnly`, `writeOnly`,
`required`, setting `additionalProperties: false`. [Learn more about
additionalProperties](https://www.speakeasy.com/guides/openapi/additionalproperties).
This means when the API is developed the OpenAPI can be used for integration
testing to poke and prod to see if extra properties can sneak though. 

Comical examples of this was somebody hacking GitHub and Rails to update the
`created_at` date to have the year 3012. This attack is known as Bender from the
Future (a reference to TV show Futurama) and made the concept of "Mass
Assignment" popular. Whitelist which specific properties should be allowed to be
written/read in planning documents and OpenAPI, and either use that OpenAPI
document for validation and serialization, or test against it once they've built
the API.

## Principle #3: Keep secrets out of the URL

Sensitive information like API keys or tokens should never appear in URLs.

Let's say an API allows filtering resources:

```http
GET /products?search=blue&apiKey=my-secret-key
```

**What Could Go Wrong**: Logs, browser history, and proxies often store URLs. If
an API key or sensitive data is passed in the URL, it's at risk of exposure.

**Design Decision**: Always pass sensitive data through headers or the body of
the request, not the URL. The body will be encrypted when HTTPS is used, but the
URL is not.

```http
GET /products?search=blue
Authorization: Bearer my-secret-key
```

Using `Authorization` has the added benefit over generic custom headers like
`X-API-Key` because it will alert HTTP caching tools to not reuse this response
for other users by default. 

This is not simply about authorization though, there are lots of other
"sensitive" things which should not go into the URL. Email addresses, social
security numbers, anything that should not be leaked to the public in general.
Pop it in the body instead.

A `GET` method generally should not have a HTTP request body (behavior is
undocumented, support is inconsistent, generally unadvisable), but the [`QUERY`
draft RFC](https://httptoolkit.com/blog/http-search-method/) could be solution
we're all looking for.

## Principle #4: Limit one-time URLs

Logins and file uploads often involve allowing a user to pass in a URL, which
will then be downloaded or redirected to. 

```http
POST /products/{productId}/images
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "import_url": "http://hopefully-innocent-website.com/something.jpg"
}
```

**What Could Go Wrong**: THis can be a big source of problems for an API, even
if the use case is something small and simple like importing an avatar for a
user. THe URL could be:

- A malicious file the API is being asked to download.
- A very large file the API will run out of resources trying to download.
- Intercepted by a malicious actor on an infected network to change the DNS of
  that URL to another server which is malicious.

**Design Decision**: The API design for image uploads could be changed to take a
HTTP request with the image directly.

```http
POST /products/{productId}/images
Authorization: Bearer {access_token}
Content-Type: image/png

<image data>
```

People could still try to upload malicious files directly, but its easier to
scan the incoming request body for problems and reject it. This can be done on
the API gateway or via other threat detection like Cloudflare.

With an API gateway in place, if this request is problematically large the
gateway will reject the request without consuming any resources at all on the
API server.

Malicious users on an infected network could still be messing with DNS settings,
but they would have to mess with the API in question - which should have proper
HTTPS setup and be much harder for them to do. Compared to their ability to mess
with `http://hopefully-innocent-website.com/` which may not be set up so well.

## Principle #5: Don't help competitors steal data

Using auto-incrementing IDs as identifiers in an API makes it incredibly easy
for malicious actors to glean insights into potentially sensitive data a
business might not want to expose, or allow outright theft of an entire dataset.

A startup tracking street art around the world (think Banksy, Bragga, and
smaller artists) built an amazing unique database of user-generated photographs
and locations of all sorts of graffiti, sculptures, installations, etc. 

This data was not available anywhere else on the Internet, but their website
relied on two API endpoints:

```http
GET /artworks/234
GET /users/6138
```

**What Could Go Wrong**: Looking at the URL `GET /users/6138`, its not too hard
to assume I can look at `GET /users/1`. If that shows me data, I can reasonably
assume they have at least 6138 users, but to find the total I can easily make a
script that `id+1` and counts every HTTP status 200 to show me how many users
are in the system. It can also counts things like 404 or 410, to give a accurate
number of how many active users versus inactive users, leaking a "churn rate"
which could be embarrassing in the press of scare off investors.

Using the same approach a client can hit `GET /artworks/1` and loop through with `id
+ 1` to grab a hold of all that data, which helped that company populate their
own database, making a new competitor quite easily, and with a slightly better
app as they didn't have to spend time or money building the dataset in the first
place. This put the original startup out of business.

**Design Decision**: There are non-incremental or "hard to guess" system of
identifiers instead. Standards like
[UUID](https://www.rfc-editor.org/rfc/rfc9562.html) or
[Snowflake](https://en.wikipedia.org/wiki/Snowflake_ID) instead.

Instead of having `/artworks/1` and `/artworks/2`, design the API to use UUID:

```http
GET /artworks/c1b07800-b001-4ba9-8372-e0260cf25242
GET /artworks/4e44cf4a-fbe0-4630-983f-ccd55b7e4870
```

There is no way for anyone to glean from this how many resources the API has, or
guess the next one, without brute forcing the API with infinite arbitrary
requests...

## Principle #6: Rate limiting and throttling

Prevent abuse by controlling how frequently clients can interact with an API.

Consider a public API endpoint for retrieving weather data:

```http
GET /weather?city=London
```

**What Could Go Wrong**: Without rate limiting, a single client could make
thousands of requests per second, overloading API servers and possibly causing
a denial of service (DoS).

**Design Decision**: Implement rate limiting at the design level. Define
thresholds for various user roles:

- Free users: 100 requests per hour
- Paid users: 1,000 requests per hour

Communicate these limits clearly in API documentation and return appropriate
status codes like `429 Too Many Requests` when limits are exceeded. 

Learn more about [rate limiting](/api-design/rate-limiting).

## Principle #7: Security through obscurity is not enough

An e-commerce platform for online stores (shops) provides a listing page with
the revenue charts for their hosted shops. Inspecting the browser requests, an
attacker can identify the API endpoints used as a data source for those charts
and their pattern: `/shops/{shopName}/revenue_data.json`. Using another API
endpoint, the attacker can get the list of all hosted shop names. With a simple
script to manipulate the names in the list, replacing {shopName} in the URL, the
attacker gains access to the sales data of thousands of e-commerce stores.

With `/shops/{shopName}/revenue_data.json` clients could access all the
sales. Even if its a special UUID for the shop, that might be good until
somebody shares that UUID or another developers exposes the uuids elsewhere not
realizing they're being used as security... Use proper auth for things that need
to be hidden or it will be exposed.

## Open Web Application Security Project (OWASP)

OWASP is an online community that produces freely available content to help
organizations avoid making costly security mistakes with their software.

The [OWASP API Security Project](https://owasp.org/API-Security/) helps focus
specific on risks and problems that can effect insecure APIs, and illustrating
how these risks may be mitigated. To make sure an API is secure as possible,
it's worth reading through the [OWASP API Security Top 10: 2023
Edition](https://owasp.org/API-Security/editions/2023/en/0x00-header/) and
keeping up to date with new editions when they're released.

## Tooling

Much of this advice and more can be applied to an OpenAPI automatically to help
whole teams make good decisions early on in the API design process. 

- [Vacuum](https://quobix.com/vacuum/) via the built in [OWASP Ruleset](https://quobix.com/vacuum/rules/owasp/).
- [Spectral](https://github.com/stoplightio/spectral) with the [Spectral OWASP Ruleset](https://github.com/stoplightio/spectral-owasp-ruleset).

## Summary

API security isn't a bolt-on; it's a mindset. By making deliberate design
choices around authentication, authorization, data handling, and rate limiting,
many of the pitfalls outlined here and in the OWASP API Security Top 10 can be avoided.

Remember, every design decision is a trade-off. Security measures often add
complexity or impact usability. The goal is to strike the right balance,
keeping the needs of both API consumers and the business in mind. 

There's no need to go to massive massive and intrusive lengths to secure
information that is fine out in the public, but it is important to establish
good practices for limiting interactions for more sensitive data. 

Maybe this means creating more than one API.
