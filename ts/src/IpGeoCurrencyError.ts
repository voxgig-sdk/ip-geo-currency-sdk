
import { Context } from './Context'


class IpGeoCurrencyError extends Error {

  isIpGeoCurrencyError = true

  sdk = 'IpGeoCurrency'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  IpGeoCurrencyError
}

