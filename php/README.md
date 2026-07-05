# IpGeoCurrency PHP SDK



The PHP SDK for the IpGeoCurrency API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->ApiJson()` — with named operations (`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/ip-geo-currency-sdk/releases](https://github.com/voxgig-sdk/ip-geo-currency-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'ipgeocurrency_sdk.php';

$client = new IpGeoCurrencySDK();
```

### 3. Load an apijson

```php
try {
    // load() returns the bare ApiJson record (throws on error).
    $apijson = $client->ApiJson()->load(["id" => "example_id"]);
    print_r($apijson);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $apijson = $client->ApiJson()->load(["id" => "example_id"]);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = IpGeoCurrencySDK::test([
    "entity" => ["apijson" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the bare mock record (throws on error).
$apijson = $client->ApiJson()->load(["id" => "test01"]);
print_r($apijson);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new IpGeoCurrencySDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
IP_GEO_CURRENCY_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### IpGeoCurrencySDK

```php
require_once 'ipgeocurrency_sdk.php';
$client = new IpGeoCurrencySDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = IpGeoCurrencySDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### IpGeoCurrencySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `ApiJson` | `($data): ApiJsonEntity` | Create an ApiJson entity instance. |
| `CurrencyConversion` | `($data): CurrencyConversionEntity` | Create a CurrencyConversion entity instance. |
| `CurrencyRate` | `($data): CurrencyRateEntity` | Create a CurrencyRate entity instance. |
| `Json` | `($data): JsonEntity` | Create a Json entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### ApiJson

| Field | Description |
| --- | --- |
| `city` |  |
| `continent` |  |
| `continent_code` |  |
| `country` |  |
| `country_code` |  |
| `currency` |  |
| `currency_name` |  |
| `ip` |  |
| `latitude` |  |
| `longitude` |  |
| `region` |  |
| `timezone` |  |

Operations: Load.

API path: `/api-json/{ip-or-domain}`

#### CurrencyConversion

| Field | Description |
| --- | --- |
| `amount` |  |
| `base` |  |
| `rate` |  |
| `result` |  |
| `target` |  |

Operations: Load.

API path: `/api-rates/{amount}-{base}2{target}`

#### CurrencyRate

| Field | Description |
| --- | --- |
| `base` |  |
| `date` |  |
| `rate` |  |

Operations: Load.

API path: `/rates.json`

#### Json

| Field | Description |
| --- | --- |
| `city` |  |
| `continent` |  |
| `continent_code` |  |
| `country` |  |
| `country_code` |  |
| `currency` |  |
| `currency_name` |  |
| `ip` |  |
| `latitude` |  |
| `longitude` |  |
| `region` |  |
| `timezone` |  |

Operations: Load.

API path: `/json`



## Entities


### ApiJson

Create an instance: `$api_json = $client->ApiJson();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` |  |
| `continent` | `string` |  |
| `continent_code` | `string` |  |
| `country` | `string` |  |
| `country_code` | `string` |  |
| `currency` | `string` |  |
| `currency_name` | `string` |  |
| `ip` | `string` |  |
| `latitude` | `float` |  |
| `longitude` | `float` |  |
| `region` | `string` |  |
| `timezone` | `string` |  |

#### Example: Load

```php
// load() returns the bare ApiJson record (throws on error).
$api_json = $client->ApiJson()->load(["id" => "api_json_id"]);
```


### CurrencyConversion

Create an instance: `$currency_conversion = $client->CurrencyConversion();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float` |  |
| `base` | `string` |  |
| `rate` | `float` |  |
| `result` | `float` |  |
| `target` | `string` |  |

#### Example: Load

```php
// load() returns the bare CurrencyConversion record (throws on error).
$currency_conversion = $client->CurrencyConversion()->load();
```


### CurrencyRate

Create an instance: `$currency_rate = $client->CurrencyRate();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | `string` |  |
| `date` | `string` |  |
| `rate` | `array` |  |

#### Example: Load

```php
// load() returns the bare CurrencyRate record (throws on error).
$currency_rate = $client->CurrencyRate()->load();
```


### Json

Create an instance: `$json = $client->Json();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` |  |
| `continent` | `string` |  |
| `continent_code` | `string` |  |
| `country` | `string` |  |
| `country_code` | `string` |  |
| `currency` | `string` |  |
| `currency_name` | `string` |  |
| `ip` | `string` |  |
| `latitude` | `float` |  |
| `longitude` | `float` |  |
| `region` | `string` |  |
| `timezone` | `string` |  |

#### Example: Load

```php
// load() returns the bare Json record (throws on error).
$json = $client->Json()->load();
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── ipgeocurrency_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`ipgeocurrency_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$apijson = $client->ApiJson();
$apijson->load(["id" => "example_id"]);

// $apijson->data_get() now returns the apijson data from the last load
// $apijson->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
