<?php
declare(strict_types=1);

// Typed models for the IpGeoCurrency SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** ApiJson entity data model. */
class ApiJson
{
    public ?string $city = null;
    public ?string $continent = null;
    public ?string $continent_code = null;
    public ?string $country = null;
    public ?string $country_code = null;
    public ?string $currency = null;
    public ?string $currency_name = null;
    public ?string $id = null;
    public ?string $ip = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $region = null;
    public ?string $timezone = null;
}

/** Request payload for ApiJson#load. */
class ApiJsonLoadMatch
{
    public string $id;
}

/** CurrencyConversion entity data model. */
class CurrencyConversion
{
    public ?float $amount = null;
    public ?string $base = null;
    public ?float $rate = null;
    public ?float $result = null;
    public ?string $target = null;
}

/** Request payload for CurrencyConversion#load. */
class CurrencyConversionLoadMatch
{
    public float $amount;
    public string $base;
    public string $target;
}

/** CurrencyRate entity data model. */
class CurrencyRate
{
}

/** Request payload for CurrencyRate#load. */
class CurrencyRateLoadMatch
{
}

/** Json entity data model. */
class Json
{
    public ?string $city = null;
    public ?string $continent = null;
    public ?string $continent_code = null;
    public ?string $country = null;
    public ?string $country_code = null;
    public ?string $currency = null;
    public ?string $currency_name = null;
    public ?string $ip = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $region = null;
    public ?string $timezone = null;
}

/** Request payload for Json#load. */
class JsonLoadMatch
{
    public ?string $nolog = null;
}

