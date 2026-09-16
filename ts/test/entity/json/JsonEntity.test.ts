

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { IpGeoCurrencySDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('JsonEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IP_GEO_CURRENCY_TEST_LIVE=TRUE.
  afterEach(liveDelay('IP_GEO_CURRENCY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpGeoCurrencySDK.test()
    const ent = testsdk.Json()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IP_GEO_CURRENCY_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'json.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"city","req":false,"short":"City name","type":"`$STRING`","index$":0},{"active":true,"name":"continent","req":false,"short":"Continent name","type":"`$STRING`","index$":1},{"active":true,"name":"continent_code","req":false,"short":"Continent code","type":"`$STRING`","index$":2},{"active":true,"name":"country","req":false,"short":"Country name","type":"`$STRING`","index$":3},{"active":true,"name":"country_code","req":false,"short":"ISO 3166-1 alpha-2 country code","type":"`$STRING`","index$":4},{"active":true,"name":"currency","req":false,"short":"Currency code","type":"`$STRING`","index$":5},{"active":true,"name":"currency_name","req":false,"short":"Currency name","type":"`$STRING`","index$":6},{"active":true,"name":"ip","req":false,"short":"IP address","type":"`$STRING`","index$":7},{"active":true,"name":"latitude","req":false,"short":"Latitude coordinate","type":"`$NUMBER`","index$":8},{"active":true,"name":"longitude","req":false,"short":"Longitude coordinate","type":"`$NUMBER`","index$":9},{"active":true,"name":"region","req":false,"short":"Region or state","type":"`$STRING`","index$":10},{"active":true,"name":"timezone","req":false,"short":"Timezone","type":"`$STRING`","index$":11}],"name":"json","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"nolog","orig":"nolog","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /json","json":"{\"operationId\":\"getOwnIpInfo\",\"parameters\":[{\"description\":\"Disable logging feature when set (no value required)\",\"in\":\"query\",\"name\":\"nolog\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"city\":{\"description\":\"City name\",\"example\":\"Mountain View\",\"type\":\"string\"},\"continent\":{\"description\":\"Continent name\",\"example\":\"North America\",\"type\":\"string\"},\"continent_code\":{\"description\":\"Continent code\",\"example\":\"NA\",\"type\":\"string\"},\"country\":{\"description\":\"Country name\",\"example\":\"United States\",\"type\":\"string\"},\"country_code\":{\"description\":\"ISO 3166-1 alpha-2 country code\",\"example\":\"US\",\"type\":\"string\"},\"currency\":{\"description\":\"Currency code\",\"example\":\"USD\",\"type\":\"string\"},\"currency_name\":{\"description\":\"Currency name\",\"example\":\"United States Dollar\",\"type\":\"string\"},\"ip\":{\"description\":\"IP address\",\"example\":\"8.8.8.8\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"example\":37.386,\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"example\":-122.0838,\"type\":\"number\"},\"region\":{\"description\":\"Region or state\",\"example\":\"California\",\"type\":\"string\"},\"timezone\":{\"description\":\"Timezone\",\"example\":\"America/Los_Angeles\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with IP geolocation data\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded (10 requests per second)\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/json","segments":[{"lit":"json"}],"select":{"exist":["nolog"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"json","name__orig":"json","Name":"Json","name_":"json","name-":"json","NAME":"JSON","index$":3}, {"active":true,"entity":"json","key$":"BasicJsonFlow","kind":"basic","name":"BasicJsonFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"json_ref01","srcdatavar":"json_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-json_ref01"}}],"index$":0}]}, 'Json')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let json_ref01_data = Object.values(setup.data.existing.json)[0] as any

    // LOAD
    const json_ref01_ent = client.Json()
    const json_ref01_match_dt0: any = {}
    const json_ref01_data_dt0 = (await json_ref01_ent.load(json_ref01_match_dt0)).data()
    assert(null != json_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/json/JsonTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = IpGeoCurrencySDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['json01','json02','json03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IP_GEO_CURRENCY_TEST_JSON_ENTID': idmap,
    'IP_GEO_CURRENCY_TEST_LIVE': 'FALSE',
    'IP_GEO_CURRENCY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['IP_GEO_CURRENCY_TEST_JSON_ENTID']

  const live = 'TRUE' === env.IP_GEO_CURRENCY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IP_GEO_CURRENCY_TEST_JSON_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new IpGeoCurrencySDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
