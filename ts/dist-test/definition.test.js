"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "api_json",
        "accessor": "ApiJson",
        "op": "load",
        "method": "GET",
        "path": "/api-json/{ip-or-domain}",
        "args": [
            {
                "name": "id",
                "wire": "ip-or-domain",
                "value": "8.8.8.8"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "ip": "8.8.8.8",
            "country": "United States",
            "country_code": "US",
            "city": "Mountain View",
            "continent": "North America",
            "continent_code": "NA",
            "region": "California",
            "latitude": 37.386,
            "longitude": -122.0838,
            "timezone": "America/Los_Angeles",
            "currency": "USD",
            "currency_name": "United States Dollar"
        },
        "idField": "id"
    },
    {
        "entity": "currency_conversion",
        "accessor": "CurrencyConversion",
        "op": "load",
        "method": "GET",
        "path": "/api-rates/{amount}-{base}2{target}",
        "args": [
            {
                "name": "amount",
                "wire": "amount",
                "value": 10
            },
            {
                "name": "base",
                "wire": "base",
                "value": "gbp"
            },
            {
                "name": "target",
                "wire": "target",
                "value": "usd"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "amount": 10,
            "base": "GBP",
            "target": "USD",
            "result": 12.65,
            "rate": 1.265
        },
        "idField": "id"
    },
    {
        "entity": "currency_rate",
        "accessor": "CurrencyRate",
        "op": "load",
        "method": "GET",
        "path": "/rates.json",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "base": "USD",
            "date": "2024-01-15",
            "rates": {
                "EUR": 0.92,
                "GBP": 0.79,
                "JPY": 149.5,
                "AUD": 1.52
            }
        },
        "idField": "id"
    },
    {
        "entity": "json",
        "accessor": "Json",
        "op": "load",
        "method": "GET",
        "path": "/json",
        "args": [],
        "select": {
            "nolog": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "nolog"
        ],
        "queryArgs": [
            {
                "name": "nolog",
                "wire": "nolog"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "ip": "8.8.8.8",
            "country": "United States",
            "country_code": "US",
            "city": "Mountain View",
            "continent": "North America",
            "continent_code": "NA",
            "region": "California",
            "latitude": 37.386,
            "longitude": -122.0838,
            "timezone": "America/Los_Angeles",
            "currency": "USD",
            "currency_name": "United States Dollar"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map