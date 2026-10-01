

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"base":{"a":true,"h":"Base","n":"base","r":false,"sh":"Base currency (USD)","t":"`$STRING`","key$":"base","index$":0},"date":{"a":true,"fo":"date","h":"Date","n":"date","r":false,"sh":"Date of the rates","t":"`$STRING`","key$":"date","index$":1},"rates":{"a":true,"h":"Rates","n":"rates","r":false,"sh":"Exchange rates for all supported currencies","t":"`$OBJECT`","key$":"rates","index$":2}},"name":"currency_rate","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /rates.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/rates.json","q":{},"r":{},"s":[{"lit":"rates.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"currency_rate","name__orig":"currency_rate","Name":"CurrencyRate","name_":"currency_rate","name-":"currency-rate","NAME":"CURRENCY_RATE","index$":2}, {"active":true,"entity":"currency_rate","key$":"BasicCurrencyRateFlow","kind":"basic","name":"BasicCurrencyRateFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"currency_rate_ref01","srcdatavar":"currency_rate_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-currency_rate_ref01"}}],"index$":0}]}, 'CurrencyRate', {"GET /rates.json":{"protocol":"http","parameters":[]}})
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
  
