# IpGeoCurrency TypeScript SDK

The TypeScript SDK for the IpGeoCurrency API. Provides a type-safe, entity-oriented interface with full async/await support.


## Install
```bash
npm install ip-geo-currency
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { IpGeoCurrencySDK } from 'ip-geo-currency'

const client = new IpGeoCurrencySDK({
  apikey: process.env.IP-GEO-CURRENCY_APIKEY,
})
```

### 3. Load a apijson

```ts
const result = await client.ApiJson().load({ id: 'example_id' })

if (result.ok) {
  console.log(result.data)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = IpGeoCurrencySDK.test()

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new IpGeoCurrencySDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new IpGeoCurrencySDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
IP-GEO-CURRENCY_TEST_LIVE=TRUE
IP-GEO-CURRENCY_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```


## Reference

### IpGeoCurrencySDK

#### Constructor

```ts
new IpGeoCurrencySDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `ApiJson(data?)` | `ApiJsonEntity` | Create a ApiJson entity instance. |
| `CurrencyConversion(data?)` | `CurrencyConversionEntity` | Create a CurrencyConversion entity instance. |
| `CurrencyRate(data?)` | `CurrencyRateEntity` | Create a CurrencyRate entity instance. |
| `Json(data?)` | `JsonEntity` | Create a Json entity instance. |
| `tester(testopts?, sdkopts?)` | `IpGeoCurrencySDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `IpGeoCurrencySDK.test(testopts?, sdkopts?)` | `IpGeoCurrencySDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): IpGeoCurrencySDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: load.

API path: `/api-json/{ip-or-domain}`

#### CurrencyConversion

| Field | Description |
| --- | --- |
| `amount` |  |
| `base` |  |
| `rate` |  |
| `result` |  |
| `target` |  |

Operations: load.

API path: `/api-rates/{amount}-{base}2{target}`

#### CurrencyRate

| Field | Description |
| --- | --- |
| `base` |  |
| `date` |  |
| `rate` |  |

Operations: load.

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

Operations: load.

API path: `/json`



## Entities


### ApiJson

Create an instance: `const api_json = client.ApiJson()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | ``$STRING`` |  |
| `continent` | ``$STRING`` |  |
| `continent_code` | ``$STRING`` |  |
| `country` | ``$STRING`` |  |
| `country_code` | ``$STRING`` |  |
| `currency` | ``$STRING`` |  |
| `currency_name` | ``$STRING`` |  |
| `ip` | ``$STRING`` |  |
| `latitude` | ``$NUMBER`` |  |
| `longitude` | ``$NUMBER`` |  |
| `region` | ``$STRING`` |  |
| `timezone` | ``$STRING`` |  |

#### Example: Load

```ts
const api_json = await client.ApiJson().load({ id: 'api_json_id' })
```


### CurrencyConversion

Create an instance: `const currency_conversion = client.CurrencyConversion()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | ``$NUMBER`` |  |
| `base` | ``$STRING`` |  |
| `rate` | ``$NUMBER`` |  |
| `result` | ``$NUMBER`` |  |
| `target` | ``$STRING`` |  |

#### Example: Load

```ts
const currency_conversion = await client.CurrencyConversion().load({ id: 'currency_conversion_id' })
```


### CurrencyRate

Create an instance: `const currency_rate = client.CurrencyRate()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | ``$STRING`` |  |
| `date` | ``$STRING`` |  |
| `rate` | ``$OBJECT`` |  |

#### Example: Load

```ts
const currency_rate = await client.CurrencyRate().load({ id: 'currency_rate_id' })
```


### Json

Create an instance: `const json = client.Json()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | ``$STRING`` |  |
| `continent` | ``$STRING`` |  |
| `continent_code` | ``$STRING`` |  |
| `country` | ``$STRING`` |  |
| `country_code` | ``$STRING`` |  |
| `currency` | ``$STRING`` |  |
| `currency_name` | ``$STRING`` |  |
| `ip` | ``$STRING`` |  |
| `latitude` | ``$NUMBER`` |  |
| `longitude` | ``$NUMBER`` |  |
| `region` | ``$STRING`` |  |
| `timezone` | ``$STRING`` |  |

#### Example: Load

```ts
const json = await client.Json().load({ id: 'json_id' })
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
ip-geo-currency/
├── src/
│   ├── IpGeoCurrencySDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { IpGeoCurrencySDK } from 'ip-geo-currency'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
