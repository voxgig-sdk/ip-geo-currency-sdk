package = "voxgig-sdk-ip-geo-currency"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/ip-geo-currency-sdk.git"
}
description = {
  summary = "IpGeoCurrency SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["ip-geo-currency_sdk"] = "ip-geo-currency_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
