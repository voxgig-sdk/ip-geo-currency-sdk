# IpGeoCurrency PHP SDK Reference

Complete API reference for the IpGeoCurrency PHP SDK.


## IpGeoCurrencySDK

### Constructor

```php
require_once __DIR__ . '/ipgeocurrency_sdk.php';

$client = new IpGeoCurrencySDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IpGeoCurrencySDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = IpGeoCurrencySDK::test();
```


### Instance Methods

#### `ApiJson($data = null)`

Create a new `ApiJsonEntity` instance. Pass `null` for no initial data.

#### `CurrencyConversion($data = null)`

Create a new `CurrencyConversionEntity` instance. Pass `null` for no initial data.

#### `CurrencyRate($data = null)`

Create a new `CurrencyRateEntity` instance. Pass `null` for no initial data.

#### `Json($data = null)`

Create a new `JsonEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): IpGeoCurrencyUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## ApiJsonEntity

```php
$api_json = $client->ApiJson();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | No |  |
| `continent` | `string` | No |  |
| `continent_code` | `string` | No |  |
| `country` | `string` | No |  |
| `country_code` | `string` | No |  |
| `currency` | `string` | No |  |
| `currency_name` | `string` | No |  |
| `ip` | `string` | No |  |
| `latitude` | `float` | No |  |
| `longitude` | `float` | No |  |
| `region` | `string` | No |  |
| `timezone` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ApiJson()->load(["id" => "api_json_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ApiJsonEntity`

Create a new `ApiJsonEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CurrencyConversionEntity

```php
$currency_conversion = $client->CurrencyConversion();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float` | No |  |
| `base` | `string` | No |  |
| `rate` | `float` | No |  |
| `result` | `float` | No |  |
| `target` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->CurrencyConversion()->load(["amount" => 1, "base" => "base", "target" => "target"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CurrencyConversionEntity`

Create a new `CurrencyConversionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CurrencyRateEntity

```php
$currency_rate = $client->CurrencyRate();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->CurrencyRate()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CurrencyRateEntity`

Create a new `CurrencyRateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## JsonEntity

```php
$json = $client->Json();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | No |  |
| `continent` | `string` | No |  |
| `continent_code` | `string` | No |  |
| `country` | `string` | No |  |
| `country_code` | `string` | No |  |
| `currency` | `string` | No |  |
| `currency_name` | `string` | No |  |
| `ip` | `string` | No |  |
| `latitude` | `float` | No |  |
| `longitude` | `float` | No |  |
| `region` | `string` | No |  |
| `timezone` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Json()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): JsonEntity`

Create a new `JsonEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new IpGeoCurrencySDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

