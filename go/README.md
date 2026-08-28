# IpGeoCurrency Golang SDK



The Golang SDK for the IpGeoCurrency API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.ApiJson(nil)` — each with the same small set of operations (`Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/ip-geo-currency-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/ip-geo-currency-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/ip-geo-currency-sdk/go=../ip-geo-currency-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/ip-geo-currency-sdk/go"
)

func main() {
    client := sdk.New()

    // Load a single apiJson — the value is the loaded record.
    apiJson, err := client.ApiJson(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(apiJson)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
apijson, err := client.ApiJson(nil).Load(map[string]any{"id": "example_id"}, nil)
if err != nil {
    // handle err
    return
}
_ = apijson
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

apiJson, err := client.ApiJson(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(apiJson) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewIpGeoCurrencySDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewIpGeoCurrencySDK

```go
func NewIpGeoCurrencySDK(options map[string]any) *IpGeoCurrencySDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *IpGeoCurrencySDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### IpGeoCurrencySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `ApiJson` | `(data map[string]any) IpGeoCurrencyEntity` | Create an ApiJson entity instance. |
| `CurrencyConversion` | `(data map[string]any) IpGeoCurrencyEntity` | Create a CurrencyConversion entity instance. |
| `CurrencyRate` | `(data map[string]any) IpGeoCurrencyEntity` | Create a CurrencyRate entity instance. |
| `Json` | `(data map[string]any) IpGeoCurrencyEntity` | Create a Json entity instance. |

### Entity interface (IpGeoCurrencyEntity)

All entities implement the `IpGeoCurrencyEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    apiJson, err := client.ApiJson(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil { /* handle */ }
    // apiJson is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### ApiJson

| Field | Description |
| --- | --- |
| `"city"` | City name |
| `"continent"` | Continent name |
| `"continent_code"` | Continent code |
| `"country"` | Country name |
| `"country_code"` | ISO 3166-1 alpha-2 country code |
| `"currency"` | Currency code |
| `"currency_name"` | Currency name |
| `"id"` |  |
| `"ip"` | IP address |
| `"latitude"` | Latitude coordinate |
| `"longitude"` | Longitude coordinate |
| `"region"` | Region or state |
| `"timezone"` | Timezone |

Operations: Load.

API path: `/api-json/{ip-or-domain}`

#### CurrencyConversion

| Field | Description |
| --- | --- |
| `"amount"` | Original amount |
| `"base"` | Source currency code |
| `"rate"` | Exchange rate used |
| `"result"` | Converted amount |
| `"target"` | Target currency code |

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
| `"city"` | City name |
| `"continent"` | Continent name |
| `"continent_code"` | Continent code |
| `"country"` | Country name |
| `"country_code"` | ISO 3166-1 alpha-2 country code |
| `"currency"` | Currency code |
| `"currency_name"` | Currency name |
| `"ip"` | IP address |
| `"latitude"` | Latitude coordinate |
| `"longitude"` | Longitude coordinate |
| `"region"` | Region or state |
| `"timezone"` | Timezone |

Operations: Load.

API path: `/json`



## Entities


### ApiJson

Create an instance: `apiJson := client.ApiJson(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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
| `latitude` | `float64` | Latitude coordinate |
| `longitude` | `float64` | Longitude coordinate |
| `region` | `string` | Region or state |
| `timezone` | `string` | Timezone |

#### Example: Load

```go
apiJson, err := client.ApiJson(nil).Load(map[string]any{"id": "api_json_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(apiJson) // the loaded record
```


### CurrencyConversion

Create an instance: `currencyConversion := client.CurrencyConversion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float64` | Original amount |
| `base` | `string` | Source currency code |
| `rate` | `float64` | Exchange rate used |
| `result` | `float64` | Converted amount |
| `target` | `string` | Target currency code |

#### Example: Load

```go
currencyConversion, err := client.CurrencyConversion(nil).Load(map[string]any{"amount": 1, "base": "base", "target": "target"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(currencyConversion) // the loaded record
```


### CurrencyRate

Create an instance: `currencyRate := client.CurrencyRate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
currencyRate, err := client.CurrencyRate(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(currencyRate) // the loaded record
```


### Json

Create an instance: `json := client.Json(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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
| `latitude` | `float64` | Latitude coordinate |
| `longitude` | `float64` | Longitude coordinate |
| `region` | `string` | Region or state |
| `timezone` | `string` | Timezone |

#### Example: Load

```go
json, err := client.Json(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(json) // the loaded record
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/ip-geo-currency-sdk/go/
├── ip-geo-currency.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/ip-geo-currency-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
apijson := client.ApiJson(nil)
apijson.Load(map[string]any{"id": "example_id"}, nil)

// apijson.Data() now returns the apijson data from the last load
// apijson.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
