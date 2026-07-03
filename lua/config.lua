-- ProjectName SDK configuration

local function make_config()
  return {
    main = {
      name = "IpGeoCurrency",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://apip.cc",
      auth = {
        prefix = "Bearer",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["api_json"] = {},
        ["currency_conversion"] = {},
        ["currency_rate"] = {},
        ["json"] = {},
      },
    },
    entity = {
      ["api_json"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "city",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "continent",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "continent_code",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "country",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "country_code",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "currency",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "currency_name",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "ip",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 7,
          },
          {
            ["active"] = true,
            ["name"] = "latitude",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["index$"] = 8,
          },
          {
            ["active"] = true,
            ["name"] = "longitude",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["index$"] = 9,
          },
          {
            ["active"] = true,
            ["name"] = "region",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 10,
          },
          {
            ["active"] = true,
            ["name"] = "timezone",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 11,
          },
        },
        ["name"] = "api_json",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["example"] = "8.8.8.8",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "ip_or_domain",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/api-json/{ip-or-domain}",
                ["parts"] = {
                  "api-json",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["ip-or-domain"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["currency_conversion"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "amount",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "base",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "rate",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "result",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "target",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
        },
        ["name"] = "currency_conversion",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["example"] = 10,
                      ["kind"] = "param",
                      ["name"] = "amount",
                      ["orig"] = "amount",
                      ["reqd"] = true,
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = "gbp",
                      ["kind"] = "param",
                      ["name"] = "base",
                      ["orig"] = "base",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = "usd",
                      ["kind"] = "param",
                      ["name"] = "target",
                      ["orig"] = "target",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/api-rates/{amount}-{base}2{target}",
                ["parts"] = {
                  "api-rates",
                  "{amount}_{base}2{target}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["amount}-{base}2{target"] = "amount}_{base}2{target",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "amount",
                    "base",
                    "target",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "api_rate",
            },
          },
        },
      },
      ["currency_rate"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "base",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "date",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "rate",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["index$"] = 2,
          },
        },
        ["name"] = "currency_rate",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {},
                ["method"] = "GET",
                ["orig"] = "/rates.json",
                ["parts"] = {
                  "rates.json",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["json"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "city",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "continent",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "continent_code",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "country",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "country_code",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "currency",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "currency_name",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "ip",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 7,
          },
          {
            ["active"] = true,
            ["name"] = "latitude",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["index$"] = 8,
          },
          {
            ["active"] = true,
            ["name"] = "longitude",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["index$"] = 9,
          },
          {
            ["active"] = true,
            ["name"] = "region",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 10,
          },
          {
            ["active"] = true,
            ["name"] = "timezone",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 11,
          },
        },
        ["name"] = "json",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "nolog",
                      ["orig"] = "nolog",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/json",
                ["parts"] = {
                  "json",
                },
                ["select"] = {
                  ["exist"] = {
                    "nolog",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
