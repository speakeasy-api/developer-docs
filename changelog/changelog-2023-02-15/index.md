---
title: "Changelog #19: PHP SDKs Now Available!"
description: "Changes to the Speakeasy platform - February 15, 2023."
keywords:
  [api, openapi, swagger, php, sdk generation, devex, dx, developer experience]
image: "/media/changelogs/changelog-2023-02-15.png"
date: 2023-02-15
authors:
  - name: Nolan Sullivan
  - image_url: "/media/author-headshots/nolan.jpeg"
featured_image: "/media/changelogs/changelog-2023-02-15.png"
---

PHP is like the cockroach of the programming ecosystem, people love to hate on it and yet it will likely outlive all of us.

Some 80% of websites use PHP, with especially strong use in E-commerce & finance. So if you’re building an API, support for the PHP community should be at the top of your priority list. Which is why we’re excited to announce that Speakeasy now supports PHP SDK creation!

## PHP SDK Creation

As with all Speakeasy SDKs, our PHP SDKs place an emphasis on being idiomatic and type-safe. We’ve made several choices to give PHP users an experience they would expect:

- **Type hints & doc strings** wherever possible to guide the end user to use the right data types.
- [**Jms/serializer**](https://jmsyst.com/libs/serializer) to accurately serialize and deserialize json bodies
- [**Guzzle**](https://docs.guzzlephp.org/en/stable/) as the HTTP client of choice. However, like all our SDKs, we make it easy to swap in a custom client to be used if desired.

PHP is live the Speakeasy CLI, so just upgrade to the latest version and create a great SDK for your PHP users:

```bash
speakeasy generate sdk -s openapi.yaml -o ./php-sdk -l php
```

And here’s some example output from the canonical Petstore example API for an `addPet` method:

```php
/**
     * addPet - Creates a new pet in the store. Duplicates are allowed
    */
    public function addPet(\PetstoreAPI\models\operations\AddPetRequest $request): \PetstoreAPI\models\operations\AddPetResponse
    {
        $baseUrl = $this->_serverUrl;
        $url = utils\Utils::generateURL($baseUrl, '/pets');

        $options = ['http_errors' => false];
        $body = utils\Utils::serializeRequestBody($request);
        if (is_null($body)) {
            throw new \Exception('Request body is required');
        }
        $options = array_merge_recursive($options, $body);


        $client = $this->_defaultClient;
        $httpRes = $client->request('POST', $url, $options);

        $contentType = $httpRes->getHeader('Content-Type')[0] ?? '';

        $res = new \PetstoreAPI\models\operations\AddPetResponse();
        $res->statusCode = $httpRes->getStatusCode();
        $res->contentType = $contentType;

        if ($httpRes->getStatusCode() == 200) {
            if (utils\Utils::matchContentType($contentType, 'application/json')) {
                $serializer = utils\JSON::createSerializer();
                $res->pet = $serializer->deserialize($httpRes->getBody()->__toString(), 'PetstoreAPI\models\shared\Pet', 'json');
            }
        }
        else {
            if (utils\Utils::matchContentType($contentType, 'application/json')) {
                $serializer = utils\JSON::createSerializer();
                $res->error = $serializer->deserialize($httpRes->getBody()->__toString(), 'PetstoreAPI\models\shared\Error', 'json');
            }
        }

        return $res;
    }
```
