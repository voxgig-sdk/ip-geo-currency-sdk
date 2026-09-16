# IpGeoCurrency SDK configuration

module IpGeoCurrencyConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "IpGeoCurrency",
        "slug" => "ip-geo-currency",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://apip.cc",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "api_json" => {},
          "currency_conversion" => {},
          "currency_rate" => {},
          "json" => {},
        },
      },
      "entity" => {
        "api_json" => {
          "fields" => [
            {
              "name" => "city",
              "short" => "City name",
              "type" => "`$STRING`",
            },
            {
              "name" => "continent",
              "short" => "Continent name",
              "type" => "`$STRING`",
            },
            {
              "name" => "continent_code",
              "short" => "Continent code",
              "type" => "`$STRING`",
            },
            {
              "name" => "country",
              "short" => "Country name",
              "type" => "`$STRING`",
            },
            {
              "name" => "country_code",
              "short" => "ISO 3166-1 alpha-2 country code",
              "type" => "`$STRING`",
            },
            {
              "name" => "currency",
              "short" => "Currency code",
              "type" => "`$STRING`",
            },
            {
              "name" => "currency_name",
              "short" => "Currency name",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "ip",
              "short" => "IP address",
              "type" => "`$STRING`",
            },
            {
              "name" => "latitude",
              "short" => "Latitude coordinate",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "longitude",
              "short" => "Longitude coordinate",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "region",
              "short" => "Region or state",
              "type" => "`$STRING`",
            },
            {
              "name" => "timezone",
              "short" => "Timezone",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "api_json",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "8.8.8.8",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "ip_or_domain",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api-json/{ip-or-domain}",
                  "rename" => {
                    "param" => {
                      "ip-or-domain" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "api-json",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api-json",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "currency_conversion" => {
          "fields" => [
            {
              "name" => "amount",
              "short" => "Original amount",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "base",
              "short" => "Source currency code",
              "type" => "`$STRING`",
            },
            {
              "name" => "rate",
              "short" => "Exchange rate used",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "result",
              "short" => "Converted amount",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "target",
              "short" => "Target currency code",
              "type" => "`$STRING`",
            },
          ],
          "name" => "currency_conversion",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 10,
                        "kind" => "param",
                        "name" => "amount",
                        "orig" => "amount",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => "gbp",
                        "kind" => "param",
                        "name" => "base",
                        "orig" => "base",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "usd",
                        "kind" => "param",
                        "name" => "target",
                        "orig" => "target",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api-rates/{amount}-{base}2{target}",
                  "rename" => {
                    "param" => {
                      "amount}-{base}2{target" => "amount}_{base}2{target",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "api-rates",
                    },
                    {
                      "lit" => "{amount}-{base}2{target}",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "amount",
                      "base",
                      "target",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api-rates",
                    "{amount}-{base}2{target}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "currency_rate" => {
          "fields" => [],
          "name" => "currency_rate",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/rates.json",
                  "segments" => [
                    {
                      "lit" => "rates.json",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.rates`",
                  },
                  "parts" => [
                    "rates.json",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "json" => {
          "fields" => [
            {
              "name" => "city",
              "short" => "City name",
              "type" => "`$STRING`",
            },
            {
              "name" => "continent",
              "short" => "Continent name",
              "type" => "`$STRING`",
            },
            {
              "name" => "continent_code",
              "short" => "Continent code",
              "type" => "`$STRING`",
            },
            {
              "name" => "country",
              "short" => "Country name",
              "type" => "`$STRING`",
            },
            {
              "name" => "country_code",
              "short" => "ISO 3166-1 alpha-2 country code",
              "type" => "`$STRING`",
            },
            {
              "name" => "currency",
              "short" => "Currency code",
              "type" => "`$STRING`",
            },
            {
              "name" => "currency_name",
              "short" => "Currency name",
              "type" => "`$STRING`",
            },
            {
              "name" => "ip",
              "short" => "IP address",
              "type" => "`$STRING`",
            },
            {
              "name" => "latitude",
              "short" => "Latitude coordinate",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "longitude",
              "short" => "Longitude coordinate",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "region",
              "short" => "Region or state",
              "type" => "`$STRING`",
            },
            {
              "name" => "timezone",
              "short" => "Timezone",
              "type" => "`$STRING`",
            },
          ],
          "name" => "json",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "nolog",
                        "orig" => "nolog",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/json",
                  "segments" => [
                    {
                      "lit" => "json",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "nolog",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "json",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    IpGeoCurrencyFeatures.make_feature(name)
  end
end
