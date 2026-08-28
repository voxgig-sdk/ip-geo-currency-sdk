# IpGeoCurrency Ruby SDK Reference

Complete API reference for the IpGeoCurrency Ruby SDK.


## IpGeoCurrencySDK

### Constructor

```ruby
require_relative 'IpGeoCurrency_sdk'

client = IpGeoCurrencySDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IpGeoCurrencySDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = IpGeoCurrencySDK.test
```


### Instance Methods

#### `ApiJson(data = nil)`

Create a new `ApiJson` entity instance. Pass `nil` for no initial data.

#### `CurrencyConversion(data = nil)`

Create a new `CurrencyConversion` entity instance. Pass `nil` for no initial data.

#### `CurrencyRate(data = nil)`

Create a new `CurrencyRate` entity instance. Pass `nil` for no initial data.

#### `Json(data = nil)`

Create a new `Json` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## ApiJsonEntity

```ruby
api_json = client.ApiJson
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `String` | No | City name |
| `continent` | `String` | No | Continent name |
| `continent_code` | `String` | No | Continent code |
| `country` | `String` | No | Country name |
| `country_code` | `String` | No | ISO 3166-1 alpha-2 country code |
| `currency` | `String` | No | Currency code |
| `currency_name` | `String` | No | Currency name |
| `id` | `String` | No |  |
| `ip` | `String` | No | IP address |
| `latitude` | `Float` | No | Latitude coordinate |
| `longitude` | `Float` | No | Longitude coordinate |
| `region` | `String` | No | Region or state |
| `timezone` | `String` | No | Timezone |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ApiJson.load({ "id" => "api_json_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ApiJsonEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CurrencyConversionEntity

```ruby
currency_conversion = client.CurrencyConversion
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `Float` | No | Original amount |
| `base` | `String` | No | Source currency code |
| `rate` | `Float` | No | Exchange rate used |
| `result` | `Float` | No | Converted amount |
| `target` | `String` | No | Target currency code |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.CurrencyConversion.load({ "amount" => 1, "base" => "base", "target" => "target" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CurrencyConversionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CurrencyRateEntity

```ruby
currency_rate = client.CurrencyRate
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.CurrencyRate.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CurrencyRateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## JsonEntity

```ruby
json = client.Json
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `String` | No | City name |
| `continent` | `String` | No | Continent name |
| `continent_code` | `String` | No | Continent code |
| `country` | `String` | No | Country name |
| `country_code` | `String` | No | ISO 3166-1 alpha-2 country code |
| `currency` | `String` | No | Currency code |
| `currency_name` | `String` | No | Currency name |
| `ip` | `String` | No | IP address |
| `latitude` | `Float` | No | Latitude coordinate |
| `longitude` | `Float` | No | Longitude coordinate |
| `region` | `String` | No | Region or state |
| `timezone` | `String` | No | Timezone |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Json.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `JsonEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = IpGeoCurrencySDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

