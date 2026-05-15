# IpGeoCurrency SDK utility: make_context
require_relative '../core/context'
module IpGeoCurrencyUtilities
  MakeContext = ->(ctxmap, basectx) {
    IpGeoCurrencyContext.new(ctxmap, basectx)
  }
end
