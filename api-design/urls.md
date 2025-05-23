---
title: "Urls Best Practices in REST API Design"
description: "Design clean, intuitive URL structures for your API that follow RESTful principles and make your resources easy to discover and understand."
---

# Structuring URLs

A **URL** (Uniform Resource Locator) is like a postal address on the internet. Just as a postal address tells the postal service where to deliver mail, a URL tells your browser where to go to find a specific website, page, or resource in a way that both humans and computers can understand.

```
https://www.example.org/products/shoes?size=10&color=red
```

At first glance, this may seem complicated, but it's essentially a set of instructions for reaching a specific location on the web, with each word, doc, slash, and other punctuation meaning something in particular.

## The Parts of a URL

Let's break down this URL to understand how each part works, and have a look at URLs in general, before we get stuck into URLs specifically in the context of an API.

### 1. Protocol (Scheme)

```
https://
```

The **protocol** tells your browser how to communicate with the server that hosts the website. The most common protocols are:

- **HTTP** (Hypertext Transfer Protocol): This is the standard protocol used for loading web pages.
- **HTTPS** (HTTP Secure): This is the secure version of HTTP, meaning the data exchanged between your browser and the server is encrypted to increase security of data transfer.

These days most people are using HTTPS for everything. Google prefers HTTPS in search rankings. Using HTTP for an API is advised against strongly. It requires setting up a certificate which used to be expensive, but thanks to projects like [Let's Encrypt](https://letsencrypt.org/) it became free, quick, and relatively easy, to the point where most web hosting offers it by default, `https://` has become the defacto standard.

### 2. Domain Name

```
www.example.org
```

The domain name points your browser to the server where the website is hosted so that users can access the content without having to find and remember long complicated IP addresses.

The **domain name** identifies the website you want to visit. It consists of:

- **Subdomain** (optional): The `www` here is a common subdomain used for websites.
- **Second-level domain (SLD)**: `example`, which is the core part of the domain name.
- **Top-level domain (TLD)**: `.com`, which represents the organization type (`.gov`, `.edu`, `.mil`) the country (`.uk`, `.fr`), or the purpose (`.info`, `.blog`, `.earth`).

### 3. Path

```
/products/shoes
```

The **path** indicates the specific page or resource you're trying to access within the website. It works like an internal "room" in a building—after reaching the site (the building), the path tells you where to go inside. In this case, `/products/shoes` leads to a page showing shoes for sale.

### 4. Query String

```
?size=10&color=red
```

The **query string** is used to send extra information to the website, often to filter or customize what you want to see. In this example, `size=10&color=red` asks the website to show red shoes in size 10.

Query strings start with a `?` and are followed by **key-value pairs** that are separated by `&`. This helps the server return exactly what you're asking for.

## How URLs Work in the Browser

When you enter a URL into your browser or click a link, here's what happens behind the scenes:

1. **Request**: Your browser sends an **HTTP request** to the server at the domain (e.g., `www.example.org`). It uses the protocol (HTTP or HTTPS) to communicate.
2. **Process**: The server checks the **path** (e.g., `/products/shoes`) to find the correct resource (in this case, a web page about shoes).
3. **Response**: If the server finds the resource, it sends back an **HTTP response** containing the content (e.g., a web page, an image, or a file). If the resource doesn't exist, you might get an error, like "404 Not Found."

The URL is the full address your browser needs to complete these steps, making it a crucial part of how you access information online.

## URLs in REST APIs: A Gateway to Resources

In the world of **REST APIs**, URLs are not just for webpages but also for identifying and interacting with specific resources across the API, across an organization, or across the entire Internet. APIs are used by systems and applications to communicate with each other, and URLs act as a unique identifier for those resources, as well as acting as an address with to find more information.

Here's an example of how URLs work in REST APIs:

```
https://api.example.org/collections/shoes/products?sort=date&size=10&color=red
```

This may look similar to a regular web URL, and it absolutely is. All the same concepts existing in an API as in a general website, because the Internet is built using the same principles as a REST API. In an API, each part of the URL has a specific purpose for data exchange.

### 1. Protocol

```
https://
```

Just like with a regular website, the **protocol** specifies whether the communication should be secure (HTTPS) or not (HTTP). A website might redirect `http://` requests to `https://`, but for an API it's better to simply reject requests as they could be leaking sensitive information like authentication tokens, passwords, or other private information.

### 2. Domain

```
api.example.org
```

The **domain** points to the API server that you're communicating with. Many APIs use a subdomain like `api` to distinguish the API service from the main website.

You might have one API subdomain `api.example.org` for a single API, or multiple subdomains for different services `stats.api.example.org` or `servicename.example.org`. Alternatively you might decide to host the API on the main domain and use a path for the API `example.org/api/`.

It doesn't matter much these days. Splitting web traffic between two different domains - e.g.: `www.example.org` and `api.example.org` had some pretty sizable performance concerns back in the HTTP/1.x days, as browsers would have to do DNS resolution and connection establishment repeatedly adding latency to the web request, but in a HTTP/2 (and HTTP/3) world this is no longer relevant, but some people have strong preferences based on historical reasons or infrastructure requirements.

### 3. Path

```
/collections/shoes/products
```

In a REST API, the **path** refers to a specific **resource** on the server. This e-commerce API is representing Collections and Products, and products can be assigned to collections, giving us the following structure:

- `/collections` refers to a list of collections.
- `/collections/shoes` refers to the **shoes** collection in particular. This is not defined in code, but is known as a "path parameter" allowing you to look up `shoes` in the database.
- `/collections/shoes/products` refers to the products in the shoes collection.

This allows API consumers to interact with the API in a structured way, and to access the data they need reliably in a predictable and generally optimizable way.

There are a few names for different parts of the path when used for a REST API.

1. `/users` this is known as a **Collection**.
1. `/users/<id>` this is a **Resource**.
1. `/users/<id>/posts` this is a **Sub-Collection**.
1. `/users/<id>/posts/<post-id>` this is a **Sub-Resource**.

Having sub-collections and sub-resources is known as "nesting", and you want to limit nesting as much as possible. It can feel neat and sensible at first, but it's easy to get carried away and people do things like `/users/<id>/orders/<order-id>`. This is not only unnecessary and complicated, but can lead to a few awkward problems.

**Resources are not strictly dependent on their parent:** The hierarchy becomes restrictive when sub-resources can exist independently or relate to multiple entities. For instance, an `order` might belong to a `user`, but you may also need to access `orders` independently or through other entities (like `products` or `shops`).

**Excessive Depth:** Deeply nested resources can lead to complex, hard-to-manage URL structures. For example:

```
/users/123/orders/456/products/789/reviews/1011
```

This URL indicates a very rigid hierarchy where reviews are always tied to a product that is tied to an order for a user. If your use case changes, or if you want to access reviews independently (e.g., by searching for reviews across all products or orders), this rigid hierarchy becomes unwieldy.

**Loss of Flexibility:** As your application evolves, you might need to interact with resources in ways that don't fit the original hierarchy. Overly strict nesting forces clients to always traverse through the parent resources, even when it's unnecessary or illogical for certain operations. For example, fetching an order might not always need to be tied to a user, especially if your system grows to allow for admin views where orders are retrieved without needing the user context.

**Duplication of Resources:** If a resource belongs to multiple parents, nesting creates redundant endpoints. For example a sub-resource like this:

```
/users/123/orders/456
/shops/789/orders/456
```

The order belongs to both a user and a shop, forcing you to maintain multiple endpoints for the same resource. This increases code complexity, and makes network caching confusing and inconsistent. There's no reason to litter the URL with irrelevant parent data, that sub-resource example could just be:

```
/orders/456
```

Instead of using sub-collections, we can use a "top-level collection" with query parameters.

```
/orders?user-id=123
/orders?shop-id=789
```

### 4. Query Parameters

```
?sort=date&size=10&color=red
```

In REST APIs, **query parameters** are used to refine the data you're requesting, allowing for [filtering & sorting](/api-design/filtering-responses), and [pagination](/api-design/pagination).

- `size=10` asks the server to return 10 products.
- `color=red` asks the server to return only red products.
- `sort=date` asks the server to return the products sorted by date.

The first query parameter is demarcated with a `?`, and subsequent query parameters are separated by `&`.

Filtering can be done for related content too, with id's or other criteria being passed in:

```
/orders?user-id=123&status=pending
```

Query string parameters are handy, but the more an API uses, the harder it is to [cache](/api-design/caching). There is no right or wrong number of query parameters to use, just try to weigh up the value of the functionality they will offer, against the performance cost they may incur.

### Summary

A URL is like an address that tells your browser or application where to find a resource on the internet or an API. In a web context, URLs help us navigate to specific pages, while in REST APIs, they act as powerful tools for accessing and manipulating data.

By understanding the different parts of a URL—protocol, domain, path, and query parameters—you can better navigate the web and use APIs to retrieve or update information in a precise, structured way.
