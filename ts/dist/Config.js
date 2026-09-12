"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'IpGeoCurrency',
        slug: "ip-geo-currency",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://apip.cc",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            api_json: {},
            currency_conversion: {},
            currency_rate: {},
            json: {},
        }
    };
    entity = {
        "api_json": {
            "fields": [
                {
                    "name": "city",
                    "short": "City name",
                    "type": "`$STRING`"
                },
                {
                    "name": "continent",
                    "short": "Continent name",
                    "type": "`$STRING`"
                },
                {
                    "name": "continent_code",
                    "short": "Continent code",
                    "type": "`$STRING`"
                },
                {
                    "name": "country",
                    "short": "Country name",
                    "type": "`$STRING`"
                },
                {
                    "name": "country_code",
                    "short": "ISO 3166-1 alpha-2 country code",
                    "type": "`$STRING`"
                },
                {
                    "name": "currency",
                    "short": "Currency code",
                    "type": "`$STRING`"
                },
                {
                    "name": "currency_name",
                    "short": "Currency name",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "ip",
                    "short": "IP address",
                    "type": "`$STRING`"
                },
                {
                    "name": "latitude",
                    "short": "Latitude coordinate",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "longitude",
                    "short": "Longitude coordinate",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "region",
                    "short": "Region or state",
                    "type": "`$STRING`"
                },
                {
                    "name": "timezone",
                    "short": "Timezone",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "api_json",
            "op": {
                "load": {
                    "input": "data",
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api-json/{ip-or-domain}",
                            "rename": {
                                "param": {
                                    "ip-or-domain": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "api-json"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api-json",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "currency_conversion": {
            "fields": [
                {
                    "name": "amount",
                    "short": "Original amount",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "base",
                    "short": "Source currency code",
                    "type": "`$STRING`"
                },
                {
                    "name": "rate",
                    "short": "Exchange rate used",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "result",
                    "short": "Converted amount",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "target",
                    "short": "Target currency code",
                    "type": "`$STRING`"
                }
            ],
            "name": "currency_conversion",
            "op": {
                "load": {
                    "input": "data",
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
                                        "reqd": true,
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "example": "gbp",
                                        "kind": "param",
                                        "name": "base",
                                        "orig": "base",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "usd",
                                        "kind": "param",
                                        "name": "target",
                                        "orig": "target",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api-rates/{amount}-{base}2{target}",
                            "rename": {
                                "param": {
                                    "amount}-{base}2{target": "amount}_{base}2{target"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "api-rates"
                                },
                                {
                                    "lit": "{amount}-{base}2{target}"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "amount",
                                    "base",
                                    "target"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api-rates",
                                "{amount}-{base}2{target}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
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
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/rates.json",
                            "segments": [
                                {
                                    "lit": "rates.json"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.rates`"
                            },
                            "parts": [
                                "rates.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "json": {
            "fields": [
                {
                    "name": "city",
                    "short": "City name",
                    "type": "`$STRING`"
                },
                {
                    "name": "continent",
                    "short": "Continent name",
                    "type": "`$STRING`"
                },
                {
                    "name": "continent_code",
                    "short": "Continent code",
                    "type": "`$STRING`"
                },
                {
                    "name": "country",
                    "short": "Country name",
                    "type": "`$STRING`"
                },
                {
                    "name": "country_code",
                    "short": "ISO 3166-1 alpha-2 country code",
                    "type": "`$STRING`"
                },
                {
                    "name": "currency",
                    "short": "Currency code",
                    "type": "`$STRING`"
                },
                {
                    "name": "currency_name",
                    "short": "Currency name",
                    "type": "`$STRING`"
                },
                {
                    "name": "ip",
                    "short": "IP address",
                    "type": "`$STRING`"
                },
                {
                    "name": "latitude",
                    "short": "Latitude coordinate",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "longitude",
                    "short": "Longitude coordinate",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "region",
                    "short": "Region or state",
                    "type": "`$STRING`"
                },
                {
                    "name": "timezone",
                    "short": "Timezone",
                    "type": "`$STRING`"
                }
            ],
            "name": "json",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "nolog",
                                        "orig": "nolog",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/json",
                            "segments": [
                                {
                                    "lit": "json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "nolog"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map