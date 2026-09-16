

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


describe('CurrencyRateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IP_GEO_CURRENCY_TEST_LIVE=TRUE.
  afterEach(liveDelay('IP_GEO_CURRENCY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpGeoCurrencySDK.test()
    const ent = testsdk.CurrencyRate()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IP_GEO_CURRENCY_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'currency_rate.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"currency_rate","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /rates.json","json":"{\"operationId\":\"getCurrencyRates\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"base\":{\"description\":\"Base currency (USD)\",\"example\":\"USD\",\"type\":\"string\"},\"date\":{\"description\":\"Date of the rates\",\"example\":\"2024-01-15\",\"format\":\"date\",\"type\":\"string\"},\"rates\":{\"additionalProperties\":{\"type\":\"number\"},\"description\":\"Exchange rates for all supported currencies\",\"example\":{\"AUD\":1.52,\"EUR\":0.92,\"GBP\":0.79,\"JPY\":149.5},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with currency rates\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded (10 requests per second)\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/rates.json","segments":[{"lit":"rates.json"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.rates`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"currency_rate","name__orig":"currency_rate","Name":"CurrencyRate","name_":"currency_rate","name-":"currency-rate","NAME":"CURRENCY_RATE","index$":2}, {"active":true,"entity":"currency_rate","key$":"BasicCurrencyRateFlow","kind":"basic","name":"BasicCurrencyRateFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"currency_rate_ref01","srcdatavar":"currency_rate_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-currency_rate_ref01"}}],"index$":0}]}, 'CurrencyRate')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let currency_rate_ref01_data = Object.values(setup.data.existing.currency_rate)[0] as any

    // LOAD
    const currency_rate_ref01_ent = client.CurrencyRate()
    const currency_rate_ref01_match_dt0: any = {}
    const currency_rate_ref01_data_dt0 = (await currency_rate_ref01_ent.load(currency_rate_ref01_match_dt0)).data()
    assert(null != currency_rate_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/currency_rate/CurrencyRateTestData.json')

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
    ['currency_rate01','currency_rate02','currency_rate03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IP_GEO_CURRENCY_TEST_CURRENCY_RATE_ENTID': idmap,
    'IP_GEO_CURRENCY_TEST_LIVE': 'FALSE',
    'IP_GEO_CURRENCY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['IP_GEO_CURRENCY_TEST_CURRENCY_RATE_ENTID']

  const live = 'TRUE' === env.IP_GEO_CURRENCY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IP_GEO_CURRENCY_TEST_CURRENCY_RATE_ENTID']
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
  
