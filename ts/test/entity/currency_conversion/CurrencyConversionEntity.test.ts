

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"amount","req":false,"short":"Original amount","type":"`$NUMBER`","index$":0},{"active":true,"name":"base","req":false,"short":"Source currency code","type":"`$STRING`","index$":1},{"active":true,"name":"rate","req":false,"short":"Exchange rate used","type":"`$NUMBER`","index$":2},{"active":true,"name":"result","req":false,"short":"Converted amount","type":"`$NUMBER`","index$":3},{"active":true,"name":"target","req":false,"short":"Target currency code","type":"`$STRING`","index$":4}],"name":"currency_conversion","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":10,"kind":"param","name":"amount","orig":"amount","reqd":true,"type":"`$NUMBER`","index$":0},{"active":true,"example":"gbp","kind":"param","name":"base","orig":"base","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"example":"usd","kind":"param","name":"target","orig":"target","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /api-rates/{amount}-{base}2{target}","json":"{\"operationId\":\"convertCurrency\",\"parameters\":[{\"description\":\"Amount to convert\",\"example\":10,\"in\":\"path\",\"name\":\"amount\",\"required\":true,\"schema\":{\"type\":\"number\"}},{\"description\":\"Source currency code (e.g., gbp, usd, eur)\",\"example\":\"gbp\",\"in\":\"path\",\"name\":\"base\",\"required\":true,\"schema\":{\"enum\":[\"usd\",\"eur\",\"gbp\",\"btc\",\"aed\",\"afn\",\"all\",\"amd\",\"ang\",\"aoa\",\"ars\",\"aud\",\"awg\",\"azn\",\"bam\",\"bbd\",\"bdt\",\"bgn\",\"bhd\",\"bif\",\"bmd\",\"bnd\",\"bob\",\"brl\",\"bsd\",\"btn\",\"bwp\",\"byn\",\"bzd\",\"cad\",\"cdf\",\"chf\",\"clf\",\"clp\",\"cnh\",\"cny\",\"cop\",\"crc\",\"cuc\",\"cup\",\"cve\",\"czk\",\"djf\",\"dkk\",\"dop\",\"dzd\",\"egp\",\"ern\",\"etb\",\"fjd\",\"fkp\",\"gel\",\"ggp\",\"ghs\",\"gip\",\"gmd\",\"gnf\",\"gtq\",\"gyd\",\"hkd\",\"hnl\",\"hrk\",\"htg\",\"huf\",\"idr\",\"ils\",\"imp\",\"inr\",\"iqd\",\"irr\",\"isk\",\"jep\",\"jmd\",\"jod\",\"jpy\",\"kes\",\"kgs\",\"khr\",\"kmf\",\"kpw\",\"krw\",\"kwd\",\"kyd\",\"kzt\",\"lak\",\"lbp\",\"lkr\",\"lrd\",\"lsl\",\"lyd\",\"mad\",\"mdl\",\"mga\",\"mkd\",\"mmk\",\"mnt\",\"mop\",\"mru\",\"mur\",\"mvr\",\"mwk\",\"mxn\",\"myr\",\"mzn\",\"nad\",\"ngn\",\"nio\",\"nok\",\"npr\",\"nzd\",\"omr\",\"pab\",\"pen\",\"pgk\",\"php\",\"pkr\",\"pln\",\"pyg\",\"qar\",\"ron\",\"rsd\",\"rub\",\"rwf\",\"sar\",\"sbd\",\"scr\",\"sdg\",\"sek\",\"sgd\",\"shp\",\"sll\",\"sos\",\"srd\",\"ssp\",\"std\",\"stn\",\"svc\",\"syp\",\"szl\",\"thb\",\"tjs\",\"tmt\",\"tnd\",\"top\",\"try\",\"ttd\",\"twd\",\"tzs\",\"uah\",\"ugx\",\"uyu\",\"uzs\",\"ves\",\"vnd\",\"vuv\",\"wst\",\"xaf\",\"xag\",\"xau\",\"xcd\",\"xdr\",\"xof\",\"xpd\",\"xpf\",\"xpt\",\"yer\",\"zar\",\"zmw\",\"zwl\"],\"type\":\"string\"}},{\"description\":\"Target currency code (e.g., usd, eur, gbp)\",\"example\":\"usd\",\"in\":\"path\",\"name\":\"target\",\"required\":true,\"schema\":{\"enum\":[\"usd\",\"eur\",\"gbp\",\"btc\",\"aed\",\"afn\",\"all\",\"amd\",\"ang\",\"aoa\",\"ars\",\"aud\",\"awg\",\"azn\",\"bam\",\"bbd\",\"bdt\",\"bgn\",\"bhd\",\"bif\",\"bmd\",\"bnd\",\"bob\",\"brl\",\"bsd\",\"btn\",\"bwp\",\"byn\",\"bzd\",\"cad\",\"cdf\",\"chf\",\"clf\",\"clp\",\"cnh\",\"cny\",\"cop\",\"crc\",\"cuc\",\"cup\",\"cve\",\"czk\",\"djf\",\"dkk\",\"dop\",\"dzd\",\"egp\",\"ern\",\"etb\",\"fjd\",\"fkp\",\"gel\",\"ggp\",\"ghs\",\"gip\",\"gmd\",\"gnf\",\"gtq\",\"gyd\",\"hkd\",\"hnl\",\"hrk\",\"htg\",\"huf\",\"idr\",\"ils\",\"imp\",\"inr\",\"iqd\",\"irr\",\"isk\",\"jep\",\"jmd\",\"jod\",\"jpy\",\"kes\",\"kgs\",\"khr\",\"kmf\",\"kpw\",\"krw\",\"kwd\",\"kyd\",\"kzt\",\"lak\",\"lbp\",\"lkr\",\"lrd\",\"lsl\",\"lyd\",\"mad\",\"mdl\",\"mga\",\"mkd\",\"mmk\",\"mnt\",\"mop\",\"mru\",\"mur\",\"mvr\",\"mwk\",\"mxn\",\"myr\",\"mzn\",\"nad\",\"ngn\",\"nio\",\"nok\",\"npr\",\"nzd\",\"omr\",\"pab\",\"pen\",\"pgk\",\"php\",\"pkr\",\"pln\",\"pyg\",\"qar\",\"ron\",\"rsd\",\"rub\",\"rwf\",\"sar\",\"sbd\",\"scr\",\"sdg\",\"sek\",\"sgd\",\"shp\",\"sll\",\"sos\",\"srd\",\"ssp\",\"std\",\"stn\",\"svc\",\"syp\",\"szl\",\"thb\",\"tjs\",\"tmt\",\"tnd\",\"top\",\"try\",\"ttd\",\"twd\",\"tzs\",\"uah\",\"ugx\",\"uyu\",\"uzs\",\"ves\",\"vnd\",\"vuv\",\"wst\",\"xaf\",\"xag\",\"xau\",\"xcd\",\"xdr\",\"xof\",\"xpd\",\"xpf\",\"xpt\",\"yer\",\"zar\",\"zmw\",\"zwl\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"amount\":{\"description\":\"Original amount\",\"example\":10,\"type\":\"number\"},\"base\":{\"description\":\"Source currency code\",\"example\":\"GBP\",\"type\":\"string\"},\"rate\":{\"description\":\"Exchange rate used\",\"example\":1.265,\"type\":\"number\"},\"result\":{\"description\":\"Converted amount\",\"example\":12.65,\"type\":\"number\"},\"target\":{\"description\":\"Target currency code\",\"example\":\"USD\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with converted currency amount\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Invalid currency code or amount\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded (10 requests per second)\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api-rates/{amount}-{base}2{target}","rename":{"param":{"amount}-{base}2{target":"amount}_{base}2{target"}},"segments":[{"lit":"api-rates"},{"lit":"{amount}-{base}2{target}"}],"select":{"exist":["amount","base","target"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"currency_conversion","name__orig":"currency_conversion","Name":"CurrencyConversion","name_":"currency_conversion","name-":"currency-conversion","NAME":"CURRENCY_CONVERSION","index$":1}, {"active":true,"entity":"currency_conversion","key$":"BasicCurrencyConversionFlow","kind":"basic","name":"BasicCurrencyConversionFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"currency_conversion_ref01","srcdatavar":"currency_conversion_ref01_data","suffix":"_dt0"},"match":{"amount":"amount01","base":"base01","target":"target01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-currency_conversion_ref01"}}],"index$":0}]}, 'CurrencyConversion')
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
    ['currency_conversion01','currency_conversion02','currency_conversion03'],
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
  
