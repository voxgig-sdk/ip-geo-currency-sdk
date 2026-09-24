"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
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
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
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
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
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
                    "title": "City",
                    "type": "`$STRING`",
                    "short": "City name"
                },
                {
                    "name": "continent",
                    "title": "Continent",
                    "type": "`$STRING`",
                    "short": "Continent name"
                },
                {
                    "name": "continent_code",
                    "title": "Continent Code",
                    "type": "`$STRING`",
                    "short": "Continent code"
                },
                {
                    "name": "country",
                    "title": "Country",
                    "type": "`$STRING`",
                    "short": "Country name"
                },
                {
                    "name": "country_code",
                    "title": "Country Code",
                    "type": "`$STRING`",
                    "short": "ISO 3166-1 alpha-2 country code"
                },
                {
                    "name": "currency",
                    "title": "Currency",
                    "type": "`$STRING`",
                    "short": "Currency code"
                },
                {
                    "name": "currency_name",
                    "title": "Currency Name",
                    "type": "`$STRING`",
                    "short": "Currency name"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "ip",
                    "title": "Ip",
                    "type": "`$STRING`",
                    "short": "IP address"
                },
                {
                    "name": "latitude",
                    "title": "Latitude",
                    "type": "`$NUMBER`",
                    "short": "Latitude coordinate"
                },
                {
                    "name": "longitude",
                    "title": "Longitude",
                    "type": "`$NUMBER`",
                    "short": "Longitude coordinate"
                },
                {
                    "name": "region",
                    "title": "Region",
                    "type": "`$STRING`",
                    "short": "Region or state"
                },
                {
                    "name": "timezone",
                    "title": "Timezone",
                    "type": "`$STRING`",
                    "short": "Timezone"
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api-json/{ip-or-domain}",
                            "segments": [
                                {
                                    "lit": "api-json"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api-json",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "ip-or-domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "ip_or_domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "8.8.8.8"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
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
                    "title": "Amount",
                    "type": "`$NUMBER`",
                    "short": "Original amount"
                },
                {
                    "name": "base",
                    "title": "Base",
                    "type": "`$STRING`",
                    "short": "Source currency code"
                },
                {
                    "name": "rate",
                    "title": "Rate",
                    "type": "`$NUMBER`",
                    "short": "Exchange rate used"
                },
                {
                    "name": "result",
                    "title": "Result",
                    "type": "`$NUMBER`",
                    "short": "Converted amount"
                },
                {
                    "name": "target",
                    "title": "Target",
                    "type": "`$STRING`",
                    "short": "Target currency code"
                }
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
                                    "lit": "api-rates"
                                },
                                {
                                    "lit": "{amount}-{base}2{target}"
                                }
                            ],
                            "parts": [
                                "api-rates",
                                "{amount}-{base}2{target}"
                            ],
                            "rename": {
                                "param": {
                                    "amount}-{base}2{target": "amount}_{base}2{target"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "amount",
                                        "orig": "amount",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": 10
                                    },
                                    {
                                        "name": "base",
                                        "orig": "base",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "gbp"
                                    },
                                    {
                                        "name": "target",
                                        "orig": "target",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "usd"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "amount",
                                    "base",
                                    "target"
                                ]
                            }
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/rates.json",
                            "segments": [
                                {
                                    "lit": "rates.json"
                                }
                            ],
                            "parts": [
                                "rates.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.rates`"
                            },
                            "args": {},
                            "select": {}
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
                    "title": "City",
                    "type": "`$STRING`",
                    "short": "City name"
                },
                {
                    "name": "continent",
                    "title": "Continent",
                    "type": "`$STRING`",
                    "short": "Continent name"
                },
                {
                    "name": "continent_code",
                    "title": "Continent Code",
                    "type": "`$STRING`",
                    "short": "Continent code"
                },
                {
                    "name": "country",
                    "title": "Country",
                    "type": "`$STRING`",
                    "short": "Country name"
                },
                {
                    "name": "country_code",
                    "title": "Country Code",
                    "type": "`$STRING`",
                    "short": "ISO 3166-1 alpha-2 country code"
                },
                {
                    "name": "currency",
                    "title": "Currency",
                    "type": "`$STRING`",
                    "short": "Currency code"
                },
                {
                    "name": "currency_name",
                    "title": "Currency Name",
                    "type": "`$STRING`",
                    "short": "Currency name"
                },
                {
                    "name": "ip",
                    "title": "Ip",
                    "type": "`$STRING`",
                    "short": "IP address"
                },
                {
                    "name": "latitude",
                    "title": "Latitude",
                    "type": "`$NUMBER`",
                    "short": "Latitude coordinate"
                },
                {
                    "name": "longitude",
                    "title": "Longitude",
                    "type": "`$NUMBER`",
                    "short": "Longitude coordinate"
                },
                {
                    "name": "region",
                    "title": "Region",
                    "type": "`$STRING`",
                    "short": "Region or state"
                },
                {
                    "name": "timezone",
                    "title": "Timezone",
                    "type": "`$STRING`",
                    "short": "Timezone"
                }
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
                                    "lit": "json"
                                }
                            ],
                            "parts": [
                                "json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "nolog",
                                        "orig": "nolog",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "nolog"
                                ]
                            }
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