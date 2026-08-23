# IpGeoCurrency Golang SDK Reference

Complete API reference for the IpGeoCurrency Golang SDK.


## IpGeoCurrencySDK

### Constructor

```go
func NewIpGeoCurrencySDK(options map[string]any) *IpGeoCurrencySDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *IpGeoCurrencySDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *IpGeoCurrencySDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `ApiJson(data map[string]any) IpGeoCurrencyEntity`

Create a new `ApiJson` entity instance. Pass `nil` for no initial data.

#### `CurrencyConversion(data map[string]any) IpGeoCurrencyEntity`

Create a new `CurrencyConversion` entity instance. Pass `nil` for no initial data.

#### `CurrencyRate(data map[string]any) IpGeoCurrencyEntity`

Create a new `CurrencyRate` entity instance. Pass `nil` for no initial data.

#### `Json(data map[string]any) IpGeoCurrencyEntity`

Create a new `Json` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## ApiJsonEntity

```go
apiJson := client.ApiJson(nil)
fmt.Println(apiJson.GetName()) // "api_json"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | No | City name |
| `continent` | `string` | No | Continent name |
| `continent_code` | `string` | No | Continent code |
| `country` | `string` | No | Country name |
| `country_code` | `string` | No | ISO 3166-1 alpha-2 country code |
| `currency` | `string` | No | Currency code |
| `currency_name` | `string` | No | Currency name |
| `ip` | `string` | No | IP address |
| `latitude` | `float64` | No | Latitude coordinate |
| `longitude` | `float64` | No | Longitude coordinate |
| `region` | `string` | No | Region or state |
| `timezone` | `string` | No | Timezone |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ApiJson(nil).Load(map[string]any{"id": "api_json_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ApiJsonEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CurrencyConversionEntity

```go
currencyConversion := client.CurrencyConversion(nil)
fmt.Println(currencyConversion.GetName()) // "currency_conversion"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float64` | No | Original amount |
| `base` | `string` | No | Source currency code |
| `rate` | `float64` | No | Exchange rate used |
| `result` | `float64` | No | Converted amount |
| `target` | `string` | No | Target currency code |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.CurrencyConversion(nil).Load(map[string]any{"amount": 1, "base": "base", "target": "target"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CurrencyConversionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CurrencyRateEntity

```go
currencyRate := client.CurrencyRate(nil)
fmt.Println(currencyRate.GetName()) // "currency_rate"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.CurrencyRate(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CurrencyRateEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## JsonEntity

```go
json := client.Json(nil)
fmt.Println(json.GetName()) // "json"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | No | City name |
| `continent` | `string` | No | Continent name |
| `continent_code` | `string` | No | Continent code |
| `country` | `string` | No | Country name |
| `country_code` | `string` | No | ISO 3166-1 alpha-2 country code |
| `currency` | `string` | No | Currency code |
| `currency_name` | `string` | No | Currency name |
| `ip` | `string` | No | IP address |
| `latitude` | `float64` | No | Latitude coordinate |
| `longitude` | `float64` | No | Longitude coordinate |
| `region` | `string` | No | Region or state |
| `timezone` | `string` | No | Timezone |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Json(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `JsonEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewIpGeoCurrencySDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

