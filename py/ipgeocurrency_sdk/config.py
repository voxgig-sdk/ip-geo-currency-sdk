# IpGeoCurrency SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "IpGeoCurrency",
            "slug": "ip-geo-currency",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://apip.cc",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "api_json": {},
                "currency_conversion": {},
                "currency_rate": {},
                "json": {},
            },
        },
        "entity": {
      "api_json": {
        "fields": [
          {
            "name": "city",
            "title": "City",
            "type": "`$STRING`",
            "short": "City name",
          },
          {
            "name": "continent",
            "title": "Continent",
            "type": "`$STRING`",
            "short": "Continent name",
          },
          {
            "name": "continent_code",
            "title": "Continent Code",
            "type": "`$STRING`",
            "short": "Continent code",
          },
          {
            "name": "country",
            "title": "Country",
            "type": "`$STRING`",
            "short": "Country name",
          },
          {
            "name": "country_code",
            "title": "Country Code",
            "type": "`$STRING`",
            "short": "ISO 3166-1 alpha-2 country code",
          },
          {
            "name": "currency",
            "title": "Currency",
            "type": "`$STRING`",
            "short": "Currency code",
          },
          {
            "name": "currency_name",
            "title": "Currency Name",
            "type": "`$STRING`",
            "short": "Currency name",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "ip",
            "title": "Ip",
            "type": "`$STRING`",
            "short": "IP address",
          },
          {
            "name": "latitude",
            "title": "Latitude",
            "type": "`$NUMBER`",
            "short": "Latitude coordinate",
          },
          {
            "name": "longitude",
            "title": "Longitude",
            "type": "`$NUMBER`",
            "short": "Longitude coordinate",
          },
          {
            "name": "region",
            "title": "Region",
            "type": "`$STRING`",
            "short": "Region or state",
          },
          {
            "name": "timezone",
            "title": "Timezone",
            "type": "`$STRING`",
            "short": "Timezone",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "api_json",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api-json/{ip-or-domain}",
                "segments": [
                  {
                    "lit": "api-json",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "api-json",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ip-or-domain": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "ip_or_domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "8.8.8.8",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "currency_conversion": {
        "fields": [
          {
            "name": "amount",
            "title": "Amount",
            "type": "`$NUMBER`",
            "short": "Original amount",
          },
          {
            "name": "base",
            "title": "Base",
            "type": "`$STRING`",
            "short": "Source currency code",
          },
          {
            "name": "rate",
            "title": "Rate",
            "type": "`$NUMBER`",
            "short": "Exchange rate used",
          },
          {
            "name": "result",
            "title": "Result",
            "type": "`$NUMBER`",
            "short": "Converted amount",
          },
          {
            "name": "target",
            "title": "Target",
            "type": "`$STRING`",
            "short": "Target currency code",
          },
        ],
        "name": "currency_conversion",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api-rates/{amount}-{base}2{target}",
                "segments": [
                  {
                    "lit": "api-rates",
                  },
                  {
                    "lit": "{amount}-{base}2{target}",
                  },
                ],
                "parts": [
                  "api-rates",
                  "{amount}-{base}2{target}",
                ],
                "rename": {
                  "param": {
                    "amount}-{base}2{target": "amount}_{base}2{target",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "amount",
                      "orig": "amount",
                      "type": "`$NUMBER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 10,
                    },
                    {
                      "name": "base",
                      "orig": "base",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "gbp",
                    },
                    {
                      "name": "target",
                      "orig": "target",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "usd",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "amount",
                    "base",
                    "target",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "currency_rate": {
        "fields": [],
        "name": "currency_rate",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/rates.json",
                "segments": [
                  {
                    "lit": "rates.json",
                  },
                ],
                "parts": [
                  "rates.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.rates`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "json": {
        "fields": [
          {
            "name": "city",
            "title": "City",
            "type": "`$STRING`",
            "short": "City name",
          },
          {
            "name": "continent",
            "title": "Continent",
            "type": "`$STRING`",
            "short": "Continent name",
          },
          {
            "name": "continent_code",
            "title": "Continent Code",
            "type": "`$STRING`",
            "short": "Continent code",
          },
          {
            "name": "country",
            "title": "Country",
            "type": "`$STRING`",
            "short": "Country name",
          },
          {
            "name": "country_code",
            "title": "Country Code",
            "type": "`$STRING`",
            "short": "ISO 3166-1 alpha-2 country code",
          },
          {
            "name": "currency",
            "title": "Currency",
            "type": "`$STRING`",
            "short": "Currency code",
          },
          {
            "name": "currency_name",
            "title": "Currency Name",
            "type": "`$STRING`",
            "short": "Currency name",
          },
          {
            "name": "ip",
            "title": "Ip",
            "type": "`$STRING`",
            "short": "IP address",
          },
          {
            "name": "latitude",
            "title": "Latitude",
            "type": "`$NUMBER`",
            "short": "Latitude coordinate",
          },
          {
            "name": "longitude",
            "title": "Longitude",
            "type": "`$NUMBER`",
            "short": "Longitude coordinate",
          },
          {
            "name": "region",
            "title": "Region",
            "type": "`$STRING`",
            "short": "Region or state",
          },
          {
            "name": "timezone",
            "title": "Timezone",
            "type": "`$STRING`",
            "short": "Timezone",
          },
        ],
        "name": "json",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/json",
                "segments": [
                  {
                    "lit": "json",
                  },
                ],
                "parts": [
                  "json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "nolog",
                      "orig": "nolog",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "nolog",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
