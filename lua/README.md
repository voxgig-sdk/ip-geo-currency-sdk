# IpGeoCurrency Lua SDK



The Lua SDK for the IpGeoCurrency API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:ApiJson()` — each with the same small set of operations (`load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/ip-geo-currency-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("ip-geo-currency_sdk")

local client = sdk.new()
```

### 3. Load a currencyconversion

CurrencyConversion is nested under amount, so provide the `amount`.

```lua
local currencyconversion, err = client:CurrencyConversion():load({ amount = 1, base = "example_base", target = "example_target" })
if err then error(err) end
print(currencyconversion)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local apijson, err = client:ApiJson():load({ id = "example_id" })
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:ApiJson():load({ id = "test01" })
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
IP_GEO_CURRENCY_TEST_LIVE=TRUE
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### IpGeoCurrencySDK

```lua
local sdk = require("ip-geo-currency_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### IpGeoCurrencySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `ApiJson` | `(data) -> ApiJsonEntity` | Create an ApiJson entity instance. |
| `CurrencyConversion` | `(data) -> CurrencyConversionEntity` | Create a CurrencyConversion entity instance. |
| `CurrencyRate` | `(data) -> CurrencyRateEntity` | Create a CurrencyRate entity instance. |
| `Json` | `(data) -> JsonEntity` | Create a Json entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local api_json, err = client:ApiJson():load({ id = "example_id" })
    if err then error(err) end
    -- api_json is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### ApiJson

| Field | Description |
| --- | --- |
| `city` | City name |
| `continent` | Continent name |
| `continent_code` | Continent code |
| `country` | Country name |
| `country_code` | ISO 3166-1 alpha-2 country code |
| `currency` | Currency code |
| `currency_name` | Currency name |
| `id` |  |
| `ip` | IP address |
| `latitude` | Latitude coordinate |
| `longitude` | Longitude coordinate |
| `region` | Region or state |
| `timezone` | Timezone |

Operations: Load.

API path: `/api-json/{ip-or-domain}`

#### CurrencyConversion

| Field | Description |
| --- | --- |
| `amount` | Original amount |
| `base` | Source currency code |
| `rate` | Exchange rate used |
| `result` | Converted amount |
| `target` | Target currency code |

Operations: Load.

API path: `/api-rates/{amount}-{base}2{target}`

#### CurrencyRate

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/rates.json`

#### Json

| Field | Description |
| --- | --- |
| `city` | City name |
| `continent` | Continent name |
| `continent_code` | Continent code |
| `country` | Country name |
| `country_code` | ISO 3166-1 alpha-2 country code |
| `currency` | Currency code |
| `currency_name` | Currency name |
| `ip` | IP address |
| `latitude` | Latitude coordinate |
| `longitude` | Longitude coordinate |
| `region` | Region or state |
| `timezone` | Timezone |

Operations: Load.

API path: `/json`



## Entities


### ApiJson

Create an instance: `local api_json = client:ApiJson(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` | City name |
| `continent` | `string` | Continent name |
| `continent_code` | `string` | Continent code |
| `country` | `string` | Country name |
| `country_code` | `string` | ISO 3166-1 alpha-2 country code |
| `currency` | `string` | Currency code |
| `currency_name` | `string` | Currency name |
| `id` | `string` |  |
| `ip` | `string` | IP address |
| `latitude` | `number` | Latitude coordinate |
| `longitude` | `number` | Longitude coordinate |
| `region` | `string` | Region or state |
| `timezone` | `string` | Timezone |

#### Example: Load

```lua
local api_json, err = client:ApiJson():load({ id = "api_json_id" })
```


### CurrencyConversion

Create an instance: `local currency_conversion = client:CurrencyConversion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `number` | Original amount |
| `base` | `string` | Source currency code |
| `rate` | `number` | Exchange rate used |
| `result` | `number` | Converted amount |
| `target` | `string` | Target currency code |

#### Example: Load

```lua
local currency_conversion, err = client:CurrencyConversion():load({ amount = 1, base = "base", target = "target" })
```


### CurrencyRate

Create an instance: `local currency_rate = client:CurrencyRate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local currency_rate, err = client:CurrencyRate():load()
```


### Json

Create an instance: `local json = client:Json(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` | City name |
| `continent` | `string` | Continent name |
| `continent_code` | `string` | Continent code |
| `country` | `string` | Country name |
| `country_code` | `string` | ISO 3166-1 alpha-2 country code |
| `currency` | `string` | Currency code |
| `currency_name` | `string` | Currency name |
| `ip` | `string` | IP address |
| `latitude` | `number` | Latitude coordinate |
| `longitude` | `number` | Longitude coordinate |
| `region` | `string` | Region or state |
| `timezone` | `string` | Timezone |

#### Example: Load

```lua
local json, err = client:Json():load()
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── ip-geo-currency_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`ip-geo-currency_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local apijson = client:ApiJson()
apijson:load({ id = "example_id" })

-- apijson:data_get() now returns the apijson data from the last load
-- apijson:match_get() returns the last match criteria
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
