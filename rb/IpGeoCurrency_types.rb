# frozen_string_literal: true

# Typed models for the IpGeoCurrency SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# ApiJson entity data model.
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] continent
#   @return [String, nil]
#
# @!attribute [rw] continent_code
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] currency_name
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] timezone
#   @return [String, nil]
ApiJson = Struct.new(
  :city,
  :continent,
  :continent_code,
  :country,
  :country_code,
  :currency,
  :currency_name,
  :id,
  :ip,
  :latitude,
  :longitude,
  :region,
  :timezone,
  keyword_init: true
)

# Request payload for ApiJson#load.
#
# @!attribute [rw] id
#   @return [String]
ApiJsonLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# CurrencyConversion entity data model.
#
# @!attribute [rw] amount
#   @return [Float, nil]
#
# @!attribute [rw] base
#   @return [String, nil]
#
# @!attribute [rw] rate
#   @return [Float, nil]
#
# @!attribute [rw] result
#   @return [Float, nil]
#
# @!attribute [rw] target
#   @return [String, nil]
CurrencyConversion = Struct.new(
  :amount,
  :base,
  :rate,
  :result,
  :target,
  keyword_init: true
)

# Request payload for CurrencyConversion#load.
#
# @!attribute [rw] amount
#   @return [Float]
#
# @!attribute [rw] base
#   @return [String]
#
# @!attribute [rw] target
#   @return [String]
CurrencyConversionLoadMatch = Struct.new(
  :amount,
  :base,
  :target,
  keyword_init: true
)

# CurrencyRate entity data model.
class CurrencyRate
end

# Request payload for CurrencyRate#load.
class CurrencyRateLoadMatch
end

# Json entity data model.
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] continent
#   @return [String, nil]
#
# @!attribute [rw] continent_code
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] currency_name
#   @return [String, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] timezone
#   @return [String, nil]
Json = Struct.new(
  :city,
  :continent,
  :continent_code,
  :country,
  :country_code,
  :currency,
  :currency_name,
  :ip,
  :latitude,
  :longitude,
  :region,
  :timezone,
  keyword_init: true
)

# Request payload for Json#load.
#
# @!attribute [rw] nolog
#   @return [String, nil]
JsonLoadMatch = Struct.new(
  :nolog,
  keyword_init: true
)

