

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


describe('CurrencyConversionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IP_GEO_CURRENCY_TEST_LIVE=TRUE.
  afterEach(liveDelay('IP_GEO_CURRENCY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpGeoCurrencySDK.test()
    const ent = testsdk.CurrencyConversion()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IP_GEO_CURRENCY_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'currency_conversion.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"amount":{"a":true,"h":"Amount","n":"amount","r":false,"sh":"Original amount","t":"`$NUMBER`","key$":"amount","index$":0},"base":{"a":true,"h":"Base","n":"base","r":false,"sh":"Source currency code","t":"`$STRING`","key$":"base","index$":1},"rate":{"a":true,"h":"Rate","n":"rate","r":false,"sh":"Exchange rate used","t":"`$NUMBER`","key$":"rate","index$":2},"result":{"a":true,"h":"Result","n":"result","r":false,"sh":"Converted amount","t":"`$NUMBER`","key$":"result","index$":3},"target":{"a":true,"h":"Target","n":"target","r":false,"sh":"Target currency code","t":"`$STRING`","key$":"target","index$":4}},"name":"currency_conversion","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api-rates/{amount}-{base}2{target}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":10,"k":"param","n":"amount","or":"amount","r":true,"t":"`$NUMBER`","index$":0},{"a":true,"ex":"gbp","k":"param","n":"base","or":"base","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":"usd","k":"param","n":"target","or":"target","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api-rates/{amount}-{base}2{target}","q":{"exist":["amount","base","target"]},"r":{"param":{"amount}-{base}2{target":"amount}_{base}2{target"}},"s":[{"lit":"api-rates"},{"lit":"{amount}-{base}2{target}"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"currency_conversion","name__orig":"currency_conversion","Name":"CurrencyConversion","name_":"currency_conversion","name-":"currency-conversion","NAME":"CURRENCY_CONVERSION","index$":1}, {"active":true,"entity":"currency_conversion","key$":"BasicCurrencyConversionFlow","kind":"basic","name":"BasicCurrencyConversionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"currency_conversion_ref01","srcdatavar":"currency_conversion_ref01_data","suffix":"_dt0"},"m":{"amount":"amount01","base":"base01","target":"target01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-currency_conversion_ref01"}}],"index$":0}]}, 'CurrencyConversion', {"GET /api-rates/{amount}-{base}2{target}":{"protocol":"http","operationId":"convertCurrency","responses":{"200":{"description":"Successful response with converted currency amount","content":{"application/json":{"schema":{"type":"object","properties":{"amount":{"type":"number","description":"Original amount","example":10,"key$":"amount"},"base":{"type":"string","description":"Source currency code","example":"GBP","key$":"base"},"target":{"type":"string","description":"Target currency code","example":"USD","key$":"target"},"result":{"type":"number","description":"Converted amount","example":12.65,"key$":"result"},"rate":{"type":"number","description":"Exchange rate used","example":1.265,"key$":"rate"}},"x-ref":"#/components/schemas/CurrencyConversionResponse","index$":0}}}},"400":{"description":"Invalid currency code or amount","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}},"429":{"description":"Rate limit exceeded (10 requests per second)","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"amount","in":"path","description":"Amount to convert","required":true,"schema":{"type":"number"},"example":10,"index$":0},{"name":"base","in":"path","description":"Source currency code (e.g., gbp, usd, eur)","required":true,"schema":{"type":"string","enum":["usd","eur","gbp","btc","aed","afn","all","amd","ang","aoa","ars","aud","awg","azn","bam","bbd","bdt","bgn","bhd","bif","bmd","bnd","bob","brl","bsd","btn","bwp","byn","bzd","cad","cdf","chf","clf","clp","cnh","cny","cop","crc","cuc","cup","cve","czk","djf","dkk","dop","dzd","egp","ern","etb","fjd","fkp","gel","ggp","ghs","gip","gmd","gnf","gtq","gyd","hkd","hnl","hrk","htg","huf","idr","ils","imp","inr","iqd","irr","isk","jep","jmd","jod","jpy","kes","kgs","khr","kmf","kpw","krw","kwd","kyd","kzt","lak","lbp","lkr","lrd","lsl","lyd","mad","mdl","mga","mkd","mmk","mnt","mop","mru","mur","mvr","mwk","mxn","myr","mzn","nad","ngn","nio","nok","npr","nzd","omr","pab","pen","pgk","php","pkr","pln","pyg","qar","ron","rsd","rub","rwf","sar","sbd","scr","sdg","sek","sgd","shp","sll","sos","srd","ssp","std","stn","svc","syp","szl","thb","tjs","tmt","tnd","top","try","ttd","twd","tzs","uah","ugx","uyu","uzs","ves","vnd","vuv","wst","xaf","xag","xau","xcd","xdr","xof","xpd","xpf","xpt","yer","zar","zmw","zwl"]},"example":"gbp","index$":1},{"name":"target","in":"path","description":"Target currency code (e.g., usd, eur, gbp)","required":true,"schema":{"type":"string","enum":["usd","eur","gbp","btc","aed","afn","all","amd","ang","aoa","ars","aud","awg","azn","bam","bbd","bdt","bgn","bhd","bif","bmd","bnd","bob","brl","bsd","btn","bwp","byn","bzd","cad","cdf","chf","clf","clp","cnh","cny","cop","crc","cuc","cup","cve","czk","djf","dkk","dop","dzd","egp","ern","etb","fjd","fkp","gel","ggp","ghs","gip","gmd","gnf","gtq","gyd","hkd","hnl","hrk","htg","huf","idr","ils","imp","inr","iqd","irr","isk","jep","jmd","jod","jpy","kes","kgs","khr","kmf","kpw","krw","kwd","kyd","kzt","lak","lbp","lkr","lrd","lsl","lyd","mad","mdl","mga","mkd","mmk","mnt","mop","mru","mur","mvr","mwk","mxn","myr","mzn","nad","ngn","nio","nok","npr","nzd","omr","pab","pen","pgk","php","pkr","pln","pyg","qar","ron","rsd","rub","rwf","sar","sbd","scr","sdg","sek","sgd","shp","sll","sos","srd","ssp","std","stn","svc","syp","szl","thb","tjs","tmt","tnd","top","try","ttd","twd","tzs","uah","ugx","uyu","uzs","ves","vnd","vuv","wst","xaf","xag","xau","xcd","xdr","xof","xpd","xpf","xpt","yer","zar","zmw","zwl"]},"example":"usd","index$":2}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let currency_conversion_ref01_data = Object.values(setup.data.existing.currency_conversion)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const currency_conversion_ref01_ent = client.CurrencyConversion()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/currency_conversion/CurrencyConversionTestData.json')

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
    ['currency_conversion01','currency_conversion02','currency_conversion03','amount01','base01','target01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IP_GEO_CURRENCY_TEST_CURRENCY_CONVERSION_ENTID': idmap,
    'IP_GEO_CURRENCY_TEST_LIVE': 'FALSE',
    'IP_GEO_CURRENCY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['IP_GEO_CURRENCY_TEST_CURRENCY_CONVERSION_ENTID']

  const live = 'TRUE' === env.IP_GEO_CURRENCY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IP_GEO_CURRENCY_TEST_CURRENCY_CONVERSION_ENTID']
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
  
