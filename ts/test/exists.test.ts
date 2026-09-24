
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { IpGeoCurrencySDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = IpGeoCurrencySDK.test()
    equal(testsdk instanceof IpGeoCurrencySDK, true,
      'IpGeoCurrencySDK.test() must return a client synchronously')
  })

})
