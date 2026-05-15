
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { IpGeoCurrencySDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await IpGeoCurrencySDK.test()
    equal(null !== testsdk, true)
  })

})
