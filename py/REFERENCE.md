# IpGeoCurrency Python SDK Reference

Complete API reference for the IpGeoCurrency Python SDK.


## IpGeoCurrencySDK

### Constructor

```python
from ipgeocurrency_sdk import IpGeoCurrencySDK

client = IpGeoCurrencySDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IpGeoCurrencySDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = IpGeoCurrencySDK.test()
```


### Instance Methods

#### `ApiJson(data=None)`

Create a new `ApiJsonEntity` instance. Pass `None` for no initial data.

#### `CurrencyConversion(data=None)`

Create a new `CurrencyConversionEntity` instance. Pass `None` for no initial data.

#### `CurrencyRate(data=None)`

Create a new `CurrencyRateEntity` instance. Pass `None` for no initial data.

#### `Json(data=None)`

Create a new `JsonEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## ApiJsonEntity

```python
api_json = client.ApiJson()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `str` | No |  |
| `continent` | `str` | No |  |
| `continent_code` | `str` | No |  |
| `country` | `str` | No |  |
| `country_code` | `str` | No |  |
| `currency` | `str` | No |  |
| `currency_name` | `str` | No |  |
| `ip` | `str` | No |  |
| `latitude` | `float` | No |  |
| `longitude` | `float` | No |  |
| `region` | `str` | No |  |
| `timezone` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiJson().load({"id": "api_json_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiJsonEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CurrencyConversionEntity

```python
currency_conversion = client.CurrencyConversion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float` | No |  |
| `base` | `str` | No |  |
| `rate` | `float` | No |  |
| `result` | `float` | No |  |
| `target` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.CurrencyConversion().load({"amount": 1, "base": "base", "target": "target"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CurrencyConversionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CurrencyRateEntity

```python
currency_rate = client.CurrencyRate()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.CurrencyRate().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CurrencyRateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## JsonEntity

```python
json = client.Json()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `str` | No |  |
| `continent` | `str` | No |  |
| `continent_code` | `str` | No |  |
| `country` | `str` | No |  |
| `country_code` | `str` | No |  |
| `currency` | `str` | No |  |
| `currency_name` | `str` | No |  |
| `ip` | `str` | No |  |
| `latitude` | `float` | No |  |
| `longitude` | `float` | No |  |
| `region` | `str` | No |  |
| `timezone` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Json().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `JsonEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = IpGeoCurrencySDK({
    "feature": {
        "test": {"active": True},
    },
})
```

