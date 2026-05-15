-- IpGeoCurrency SDK error

local IpGeoCurrencyError = {}
IpGeoCurrencyError.__index = IpGeoCurrencyError


function IpGeoCurrencyError.new(code, msg, ctx)
  local self = setmetatable({}, IpGeoCurrencyError)
  self.is_sdk_error = true
  self.sdk = "IpGeoCurrency"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function IpGeoCurrencyError:error()
  return self.msg
end


function IpGeoCurrencyError:__tostring()
  return self.msg
end


return IpGeoCurrencyError
