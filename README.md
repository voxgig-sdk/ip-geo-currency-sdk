# IpGeoCurrency SDK

Look up IP geolocation and USD-based currency rates with no API key required

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About IP Geo Currency API

[apip.cc](https://apip.cc) is a small public service that exposes IP geolocation and USD-based currency data over plain HTTP, returning JSON. It is operated by the apip.cc maintainers and aims to be usable directly from a browser or server without any signup.

What you get from the API:

- Geolocation lookups for the caller's own IP via `/json`, or for any IPv4/IPv6 address via `/api-json/{ip-or-domain}`.
- USD-based currency rates via `/rates.json`, refreshed roughly hourly.
- Currency conversion via `/api-rates/{amount}-{base}2{target}`.

Operational notes: CORS is enabled on all endpoints, so the API can be called from browser JavaScript. The published rate limit is approximately 1 request per second per IP (around 86,400 requests/day). No authentication header or API key is needed.

## Try it

**TypeScript**
```bash
npm install ip-geo-currency
```

**Python**
```bash
pip install ip-geo-currency-sdk
```

**PHP**
```bash
composer require voxgig/ip-geo-currency-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/ip-geo-currency-sdk/go
```

**Ruby**
```bash
gem install ip-geo-currency-sdk
```

**Lua**
```bash
luarocks install ip-geo-currency-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { IpGeoCurrencySDK } from 'ip-geo-currency'

const client = new IpGeoCurrencySDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o ip-geo-currency-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "ip-geo-currency": {
      "command": "/abs/path/to/ip-geo-currency-mcp"
    }
  }
}
```

## Entities

The API exposes 4 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **ApiJson** | IP geolocation lookups returning JSON; call `/json` for the caller's IP or `/api-json/{ipv4-ipv6-or-domain}` for a specific host. | `/api-json/{ip-or-domain}` |
| **CurrencyConversion** | Currency conversion between a base and target currency via `/api-rates/{amount}-{base}2{target}`. | `/api-rates/{amount}-{base}2{target}` |
| **CurrencyRate** | USD-based exchange rates exposed at `/rates.json`, updated automatically about once per hour. | `/rates.json` |
| **Json** | Generic JSON responses returned by the apip.cc endpoints; all data is delivered as plain JSON over HTTPS. | `/json` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from ipgeocurrency_sdk import IpGeoCurrencySDK

client = IpGeoCurrencySDK({})


# Load a specific apijson
apijson, err = client.ApiJson(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'ipgeocurrency_sdk.php';

$client = new IpGeoCurrencySDK([]);


// Load a specific apijson
[$apijson, $err] = $client->ApiJson(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/ip-geo-currency-sdk/go"

client := sdk.NewIpGeoCurrencySDK(map[string]any{})

```

### Ruby

```ruby
require_relative "IpGeoCurrency_sdk"

client = IpGeoCurrencySDK.new({})


# Load a specific apijson
apijson, err = client.ApiJson(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("ip-geo-currency_sdk")

local client = sdk.new({})


-- Load a specific apijson
local apijson, err = client:ApiJson(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = IpGeoCurrencySDK.test()
const result = await client.ApiJson().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = IpGeoCurrencySDK.test(None, None)
result, err = client.ApiJson(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = IpGeoCurrencySDK::test(null, null);
[$result, $err] = $client->ApiJson(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.ApiJson(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = IpGeoCurrencySDK.test(nil, nil)
result, err = client.ApiJson(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:ApiJson(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the IP Geo Currency API

- Upstream: [https://apip.cc](https://apip.cc)
- API docs: [https://apip.cc/docs.html](https://apip.cc/docs.html)

- Service is advertised as free for both commercial and non-commercial use.
- No registration or API key is required to call the endpoints.
- Operator terms, privacy, and disclaimer pages on `apip.cc` govern actual use; review them before redistributing data.
- No explicit attribution requirement is documented, but checking the upstream terms is recommended.

---

Generated from the IP Geo Currency API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
