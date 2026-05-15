# IpGeoCurrency SDK configuration


def make_config():
    return {
        "main": {
            "name": "IpGeoCurrency",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://apip.cc",
            "auth": {
                "prefix": "Bearer",
            },
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
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "continent",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "continent_code",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "country",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "country_code",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "currency",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "currency_name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "ip",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "latitude",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 8,
          },
          {
            "name": "longitude",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 9,
          },
          {
            "name": "region",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 10,
          },
          {
            "name": "timezone",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 11,
          },
        ],
        "name": "api_json",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "8.8.8.8",
                      "kind": "param",
                      "name": "id",
                      "orig": "ip_or_domain",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api-json/{ip-or-domain}",
                "parts": [
                  "api-json",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ip-or-domain": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
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
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "base",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "rate",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "result",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "target",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
        ],
        "name": "currency_conversion",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": 10,
                      "kind": "param",
                      "name": "amount",
                      "orig": "amount",
                      "reqd": True,
                      "type": "`$NUMBER`",
                      "active": True,
                    },
                    {
                      "example": "gbp",
                      "kind": "param",
                      "name": "base",
                      "orig": "base",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "usd",
                      "kind": "param",
                      "name": "target",
                      "orig": "target",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api-rates/{amount}-{base}2{target}",
                "parts": [
                  "api-rates",
                  "{amount}_{base}2{target}",
                ],
                "rename": {
                  "param": {
                    "amount}-{base}2{target": "amount}_{base}2{target",
                  },
                },
                "select": {
                  "exist": [
                    "amount",
                    "base",
                    "target",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "api_rate",
            ],
          ],
        },
      },
      "currency_rate": {
        "fields": [
          {
            "name": "base",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "date",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "rate",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 2,
          },
        ],
        "name": "currency_rate",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "method": "GET",
                "orig": "/rates.json",
                "parts": [
                  "rates.json",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
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
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "continent",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "continent_code",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "country",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "country_code",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "currency",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "currency_name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "ip",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "latitude",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 8,
          },
          {
            "name": "longitude",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 9,
          },
          {
            "name": "region",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 10,
          },
          {
            "name": "timezone",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 11,
          },
        ],
        "name": "json",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "nolog",
                      "orig": "nolog",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/json",
                "parts": [
                  "json",
                ],
                "select": {
                  "exist": [
                    "nolog",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
