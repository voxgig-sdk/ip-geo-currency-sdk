// Typed models for the IpGeoCurrency SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface ApiJson {
  city?: string
  continent?: string
  continent_code?: string
  country?: string
  country_code?: string
  currency?: string
  currency_name?: string
  ip?: string
  latitude?: number
  longitude?: number
  region?: string
  timezone?: string
}

export interface ApiJsonLoadMatch {
  id: string
}

export interface CurrencyConversion {
  amount?: number
  base?: string
  rate?: number
  result?: number
  target?: string
}

export interface CurrencyConversionLoadMatch {
  amount: number
  base: string
  target: string
}

export interface CurrencyRate {
}

export interface CurrencyRateLoadMatch {
}

export interface Json {
  city?: string
  continent?: string
  continent_code?: string
  country?: string
  country_code?: string
  currency?: string
  currency_name?: string
  ip?: string
  latitude?: number
  longitude?: number
  region?: string
  timezone?: string
}

export interface JsonLoadMatch {
  city?: string
  continent?: string
  continent_code?: string
  country?: string
  country_code?: string
  currency?: string
  currency_name?: string
  ip?: string
  latitude?: number
  longitude?: number
  region?: string
  timezone?: string
}

