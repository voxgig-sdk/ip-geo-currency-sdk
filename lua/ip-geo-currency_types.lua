-- Typed models for the IpGeoCurrency SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class ApiJson
---@field city? string
---@field continent? string
---@field continent_code? string
---@field country? string
---@field country_code? string
---@field currency? string
---@field currency_name? string
---@field ip? string
---@field latitude? number
---@field longitude? number
---@field region? string
---@field timezone? string

---@class ApiJsonLoadMatch
---@field id string

---@class CurrencyConversion
---@field amount? number
---@field base? string
---@field rate? number
---@field result? number
---@field target? string

---@class CurrencyConversionLoadMatch
---@field amount number
---@field base string
---@field target string

---@class CurrencyRate
---@field base? string
---@field date? string
---@field rate? table

---@class CurrencyRateLoadMatch
---@field base? string
---@field date? string
---@field rate? table

---@class Json
---@field city? string
---@field continent? string
---@field continent_code? string
---@field country? string
---@field country_code? string
---@field currency? string
---@field currency_name? string
---@field ip? string
---@field latitude? number
---@field longitude? number
---@field region? string
---@field timezone? string

---@class JsonLoadMatch
---@field city? string
---@field continent? string
---@field continent_code? string
---@field country? string
---@field country_code? string
---@field currency? string
---@field currency_name? string
---@field ip? string
---@field latitude? number
---@field longitude? number
---@field region? string
---@field timezone? string

local M = {}

return M
