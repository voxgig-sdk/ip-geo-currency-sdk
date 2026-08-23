package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "IpGeoCurrency",
			"slug": "ip-geo-currency",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://apip.cc",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"api_json": map[string]any{},
				"currency_conversion": map[string]any{},
				"currency_rate": map[string]any{},
				"json": map[string]any{},
			},
		},
		"entity": map[string]any{
			"api_json": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "city",
						"short": "City name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "continent",
						"short": "Continent name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "continent_code",
						"short": "Continent code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"short": "Country name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country_code",
						"short": "ISO 3166-1 alpha-2 country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "currency",
						"short": "Currency code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "currency_name",
						"short": "Currency name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"short": "IP address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "latitude",
						"short": "Latitude coordinate",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "longitude",
						"short": "Longitude coordinate",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "region",
						"short": "Region or state",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timezone",
						"short": "Timezone",
						"type": "`$STRING`",
					},
				},
				"name": "api_json",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "8.8.8.8",
											"kind": "param",
											"name": "id",
											"orig": "ip_or_domain",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api-json/{ip-or-domain}",
								"parts": []any{
									"api-json",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ip-or-domain": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"currency_conversion": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "amount",
						"short": "Original amount",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "base",
						"short": "Source currency code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rate",
						"short": "Exchange rate used",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "result",
						"short": "Converted amount",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "target",
						"short": "Target currency code",
						"type": "`$STRING`",
					},
				},
				"name": "currency_conversion",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 10,
											"kind": "param",
											"name": "amount",
											"orig": "amount",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": "gbp",
											"kind": "param",
											"name": "base",
											"orig": "base",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "usd",
											"kind": "param",
											"name": "target",
											"orig": "target",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api-rates/{amount}-{base}2{target}",
								"parts": []any{
									"api-rates",
									"{amount}_{base}2{target}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"amount}-{base}2{target": "amount}_{base}2{target",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"amount",
										"base",
										"target",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"api_rate",
						},
					},
				},
			},
			"currency_rate": map[string]any{
				"fields": []any{},
				"name": "currency_rate",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/rates.json",
								"parts": []any{
									"rates.json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.rates`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"json": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "city",
						"short": "City name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "continent",
						"short": "Continent name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "continent_code",
						"short": "Continent code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"short": "Country name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country_code",
						"short": "ISO 3166-1 alpha-2 country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "currency",
						"short": "Currency code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "currency_name",
						"short": "Currency name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"short": "IP address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "latitude",
						"short": "Latitude coordinate",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "longitude",
						"short": "Longitude coordinate",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "region",
						"short": "Region or state",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timezone",
						"short": "Timezone",
						"type": "`$STRING`",
					},
				},
				"name": "json",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "nolog",
											"orig": "nolog",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/json",
								"parts": []any{
									"json",
								},
								"select": map[string]any{
									"exist": []any{
										"nolog",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
