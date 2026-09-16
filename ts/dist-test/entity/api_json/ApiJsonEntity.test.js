"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ApiJsonEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IP_GEO_CURRENCY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IP_GEO_CURRENCY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IpGeoCurrencySDK.test();
        const ent = testsdk.ApiJson();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IP_GEO_CURRENCY_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_json.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "city", "req": false, "short": "City name", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "continent", "req": false, "short": "Continent name", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "continent_code", "req": false, "short": "Continent code", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "country", "req": false, "short": "Country name", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "country_code", "req": false, "short": "ISO 3166-1 alpha-2 country code", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "currency", "req": false, "short": "Currency code", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "currency_name", "req": false, "short": "Currency name", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "ip", "req": false, "short": "IP address", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "latitude", "req": false, "short": "Latitude coordinate", "type": "`$NUMBER`", "index$": 9 }, { "active": true, "name": "longitude", "req": false, "short": "Longitude coordinate", "type": "`$NUMBER`", "index$": 10 }, { "active": true, "name": "region", "req": false, "short": "Region or state", "type": "`$STRING`", "index$": 11 }, { "active": true, "name": "timezone", "req": false, "short": "Timezone", "type": "`$STRING`", "index$": 12 }], "id": { "field": "id", "name": "id" }, "name": "api_json", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "8.8.8.8", "kind": "param", "name": "id", "orig": "ip_or_domain", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /api-json/{ip-or-domain}", "json": "{\"operationId\":\"getIpInfo\",\"parameters\":[{\"description\":\"IP address (e.g., 8.8.8.8) or domain name to look up\",\"example\":\"8.8.8.8\",\"in\":\"path\",\"name\":\"ip-or-domain\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"city\":{\"description\":\"City name\",\"example\":\"Mountain View\",\"type\":\"string\"},\"continent\":{\"description\":\"Continent name\",\"example\":\"North America\",\"type\":\"string\"},\"continent_code\":{\"description\":\"Continent code\",\"example\":\"NA\",\"type\":\"string\"},\"country\":{\"description\":\"Country name\",\"example\":\"United States\",\"type\":\"string\"},\"country_code\":{\"description\":\"ISO 3166-1 alpha-2 country code\",\"example\":\"US\",\"type\":\"string\"},\"currency\":{\"description\":\"Currency code\",\"example\":\"USD\",\"type\":\"string\"},\"currency_name\":{\"description\":\"Currency name\",\"example\":\"United States Dollar\",\"type\":\"string\"},\"ip\":{\"description\":\"IP address\",\"example\":\"8.8.8.8\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"example\":37.386,\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"example\":-122.0838,\"type\":\"number\"},\"region\":{\"description\":\"Region or state\",\"example\":\"California\",\"type\":\"string\"},\"timezone\":{\"description\":\"Timezone\",\"example\":\"America/Los_Angeles\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with IP geolocation data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Invalid IP address or domain\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded (10 requests per second)\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api-json/{ip-or-domain}", "rename": { "param": { "ip-or-domain": "id" } }, "segments": [{ "lit": "api-json" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "api_json", "name__orig": "api_json", "Name": "ApiJson", "name_": "api_json", "name-": "api-json", "NAME": "API_JSON", "index$": 0 }, { "active": true, "entity": "api_json", "key$": "BasicApiJsonFlow", "kind": "basic", "name": "BasicApiJsonFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "api_json_ref01", "srcdatavar": "api_json_ref01_data", "suffix": "_dt0" }, "match": { "id": "api_json01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-api_json_ref01" } }], "index$": 0 }] }, 'ApiJson');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let api_json_ref01_data = Object.values(setup.data.existing.api_json)[0];
        // LOAD
        const api_json_ref01_ent = client.ApiJson();
        const api_json_ref01_match_dt0 = {};
        api_json_ref01_match_dt0.id = api_json_ref01_data.id;
        const api_json_ref01_data_dt0 = (await api_json_ref01_ent.load(api_json_ref01_match_dt0)).data();
        (0, node_assert_1.default)(api_json_ref01_data_dt0.id === api_json_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_json/ApiJsonTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IpGeoCurrencySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_json01', 'api_json02', 'api_json03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IP_GEO_CURRENCY_TEST_API_JSON_ENTID': idmap,
        'IP_GEO_CURRENCY_TEST_LIVE': 'FALSE',
        'IP_GEO_CURRENCY_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['IP_GEO_CURRENCY_TEST_API_JSON_ENTID'];
    const live = 'TRUE' === env.IP_GEO_CURRENCY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IP_GEO_CURRENCY_TEST_API_JSON_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.IpGeoCurrencySDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.IP_GEO_CURRENCY_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ApiJsonEntity.test.js.map