

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ApiJsonEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IP_GEO_CURRENCY_TEST_LIVE=TRUE.
  afterEach(liveDelay('IP_GEO_CURRENCY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpGeoCurrencySDK.test()
    const ent = testsdk.ApiJson()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IP_GEO_CURRENCY_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_json.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"city":{"a":true,"h":"City","n":"city","r":false,"sh":"City name","t":"`$STRING`","key$":"city","index$":0},"continent":{"a":true,"h":"Continent","n":"continent","r":false,"sh":"Continent name","t":"`$STRING`","key$":"continent","index$":1},"continent_code":{"a":true,"h":"Continent Code","n":"continent_code","r":false,"sh":"Continent code","t":"`$STRING`","key$":"continent_code","index$":2},"country":{"a":true,"h":"Country","n":"country","r":false,"sh":"Country name","t":"`$STRING`","key$":"country","index$":3},"country_code":{"a":true,"h":"Country Code","n":"country_code","r":false,"sh":"ISO 3166-1 alpha-2 country code","t":"`$STRING`","key$":"country_code","index$":4},"currency":{"a":true,"h":"Currency","n":"currency","r":false,"sh":"Currency code","t":"`$STRING`","key$":"currency","index$":5},"currency_name":{"a":true,"h":"Currency Name","n":"currency_name","r":false,"sh":"Currency name","t":"`$STRING`","key$":"currency_name","index$":6},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":7},"ip":{"a":true,"h":"Ip","n":"ip","r":false,"sh":"IP address","t":"`$STRING`","key$":"ip","index$":8},"latitude":{"a":true,"h":"Latitude","n":"latitude","r":false,"sh":"Latitude coordinate","t":"`$NUMBER`","key$":"latitude","index$":9},"longitude":{"a":true,"h":"Longitude","n":"longitude","r":false,"sh":"Longitude coordinate","t":"`$NUMBER`","key$":"longitude","index$":10},"region":{"a":true,"h":"Region","n":"region","r":false,"sh":"Region or state","t":"`$STRING`","key$":"region","index$":11},"timezone":{"a":true,"h":"Timezone","n":"timezone","r":false,"sh":"Timezone","t":"`$STRING`","key$":"timezone","index$":12}},"id":{"field":"id","name":"id"},"name":"api_json","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api-json/{ip-or-domain}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"8.8.8.8","k":"param","n":"id","or":"ip_or_domain","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api-json/{ip-or-domain}","q":{"exist":["id"]},"r":{"param":{"ip-or-domain":"id"}},"s":[{"lit":"api-json"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"api_json","name__orig":"api_json","Name":"ApiJson","name_":"api_json","name-":"api-json","NAME":"API_JSON","index$":0}, {"active":true,"entity":"api_json","key$":"BasicApiJsonFlow","kind":"basic","name":"BasicApiJsonFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"api_json_ref01","srcdatavar":"api_json_ref01_data","suffix":"_dt0"},"m":{"id":"api_json01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-api_json_ref01"}}],"index$":0}]}, 'ApiJson', {"GET /api-json/{ip-or-domain}":{"protocol":"http","operationId":"getIpInfo","responses":{"200":{"description":"Successful response with IP geolocation data","content":{"application/json":{"schema":{"type":"object","properties":{"ip":{"description":"IP address","example":"8.8.8.8","key$":"ip","type":"string"},"country":{"description":"Country name","example":"United States","key$":"country","type":"string"},"country_code":{"description":"ISO 3166-1 alpha-2 country code","example":"US","key$":"country_code","type":"string"},"city":{"description":"City name","example":"Mountain View","key$":"city","type":"string"},"continent":{"description":"Continent name","example":"North America","key$":"continent","type":"string"},"continent_code":{"description":"Continent code","example":"NA","key$":"continent_code","type":"string"},"region":{"description":"Region or state","example":"California","key$":"region","type":"string"},"latitude":{"description":"Latitude coordinate","example":37.386,"key$":"latitude","type":"number"},"longitude":{"description":"Longitude coordinate","example":-122.0838,"key$":"longitude","type":"number"},"timezone":{"description":"Timezone","example":"America/Los_Angeles","key$":"timezone","type":"string"},"currency":{"description":"Currency code","example":"USD","key$":"currency","type":"string"},"currency_name":{"description":"Currency name","example":"United States Dollar","key$":"currency_name","type":"string"}},"x-ref":"#/components/schemas/IpGeoResponse","index$":0}}}},"400":{"description":"Invalid IP address or domain","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}},"429":{"description":"Rate limit exceeded (10 requests per second)","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"ip-or-domain","in":"path","description":"IP address (e.g., 8.8.8.8) or domain name to look up","required":true,"schema":{"type":"string"},"example":"8.8.8.8","index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let api_json_ref01_data = Object.values(setup.data.existing.api_json)[0] as any

    // LOAD
    const api_json_ref01_ent = client.ApiJson()
    const api_json_ref01_match_dt0: any = {}
    api_json_ref01_match_dt0.id = api_json_ref01_data.id
    const api_json_ref01_data_dt0 = (await api_json_ref01_ent.load(api_json_ref01_match_dt0)).data()
    assert(api_json_ref01_data_dt0.id === api_json_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/api_json/ApiJsonTestData.json')

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
    ['api_json01','api_json02','api_json03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IP_GEO_CURRENCY_TEST_API_JSON_ENTID': idmap,
    'IP_GEO_CURRENCY_TEST_LIVE': 'FALSE',
    'IP_GEO_CURRENCY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['IP_GEO_CURRENCY_TEST_API_JSON_ENTID']

  const live = 'TRUE' === env.IP_GEO_CURRENCY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IP_GEO_CURRENCY_TEST_API_JSON_ENTID']
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
  
