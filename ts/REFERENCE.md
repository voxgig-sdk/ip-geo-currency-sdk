# IpGeoCurrency TypeScript SDK Reference

Complete API reference for the IpGeoCurrency TypeScript SDK.


## IpGeoCurrencySDK

### Constructor

```ts
new IpGeoCurrencySDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IpGeoCurrencySDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = IpGeoCurrencySDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `IpGeoCurrencySDK` instance in test mode.


### Instance Methods

#### `ApiJson(data?: object)`

Create a new `ApiJson` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiJsonEntity` instance.

#### `CurrencyConversion(data?: object)`

Create a new `CurrencyConversion` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CurrencyConversionEntity` instance.

#### `CurrencyRate(data?: object)`

Create a new `CurrencyRate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CurrencyRateEntity` instance.

#### `Json(data?: object)`

Create a new `Json` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `JsonEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `IpGeoCurrencySDK.test()`.

**Returns:** `IpGeoCurrencySDK` instance in test mode.


---

## ApiJsonEntity

```ts
const api_json = client.ApiJson()
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
| `id` | `string` | No |  |
| `ip` | `string` | No | IP address |
| `latitude` | `number` | No | Latitude coordinate |
| `longitude` | `number` | No | Longitude coordinate |
| `region` | `string` | No | Region or state |
| `timezone` | `string` | No | Timezone |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiJson().load({ id: 'api_json_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiJsonEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpGeoCurrencySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CurrencyConversionEntity

```ts
const currency_conversion = client.CurrencyConversion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | No | Original amount |
| `base` | `string` | No | Source currency code |
| `rate` | `number` | No | Exchange rate used |
| `result` | `number` | No | Converted amount |
| `target` | `string` | No | Target currency code |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.CurrencyConversion().load({ amount: 1, base: 'base', target: 'target' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CurrencyConversionEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpGeoCurrencySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CurrencyRateEntity

```ts
const currency_rate = client.CurrencyRate()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.CurrencyRate().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CurrencyRateEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpGeoCurrencySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## JsonEntity

```ts
const json = client.Json()
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
| `latitude` | `number` | No | Latitude coordinate |
| `longitude` | `number` | No | Longitude coordinate |
| `region` | `string` | No | Region or state |
| `timezone` | `string` | No | Timezone |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Json().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `JsonEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpGeoCurrencySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new IpGeoCurrencySDK({
  feature: {
    test: { active: true },
  }
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

