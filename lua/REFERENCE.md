# IpGeoCurrency Lua SDK Reference

Complete API reference for the IpGeoCurrency Lua SDK.


## IpGeoCurrencySDK

### Constructor

```lua
local sdk = require("ip-geo-currency_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `ApiJson(data)`

Create a new `ApiJson` entity instance. Pass `nil` for no initial data.

#### `CurrencyConversion(data)`

Create a new `CurrencyConversion` entity instance. Pass `nil` for no initial data.

#### `CurrencyRate(data)`

Create a new `CurrencyRate` entity instance. Pass `nil` for no initial data.

#### `Json(data)`

Create a new `Json` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## ApiJsonEntity

```lua
local api_json = client:ApiJson(nil)
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
| `latitude` | `number` | No |  |
| `longitude` | `number` | No |  |
| `region` | `string` | No |  |
| `timezone` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ApiJson():load({ id = "api_json_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiJsonEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CurrencyConversionEntity

```lua
local currency_conversion = client:CurrencyConversion(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | No |  |
| `base` | `string` | No |  |
| `rate` | `number` | No |  |
| `result` | `number` | No |  |
| `target` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:CurrencyConversion():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CurrencyConversionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CurrencyRateEntity

```lua
local currency_rate = client:CurrencyRate(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `string` | No |  |
| `date` | `string` | No |  |
| `rate` | `table` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:CurrencyRate():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CurrencyRateEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## JsonEntity

```lua
local json = client:Json(nil)
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
| `latitude` | `number` | No |  |
| `longitude` | `number` | No |  |
| `region` | `string` | No |  |
| `timezone` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Json():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `JsonEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

