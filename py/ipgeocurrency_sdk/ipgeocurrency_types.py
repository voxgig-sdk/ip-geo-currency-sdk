# Typed models for the IpGeoCurrency SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class ApiJson(TypedDict, total=False):
    city: str
    continent: str
    continent_code: str
    country: str
    country_code: str
    currency: str
    currency_name: str
    id: str
    ip: str
    latitude: float
    longitude: float
    region: str
    timezone: str


class ApiJsonLoadMatch(TypedDict):
    id: str


class CurrencyConversion(TypedDict, total=False):
    amount: float
    base: str
    rate: float
    result: float
    target: str


class CurrencyConversionLoadMatch(TypedDict):
    amount: float
    base: str
    target: str


class CurrencyRate(TypedDict):
    pass


class CurrencyRateLoadMatch(TypedDict):
    pass


class Json(TypedDict, total=False):
    city: str
    continent: str
    continent_code: str
    country: str
    country_code: str
    currency: str
    currency_name: str
    ip: str
    latitude: float
    longitude: float
    region: str
    timezone: str


class JsonLoadMatch(TypedDict, total=False):
    city: str
    continent: str
    continent_code: str
    country: str
    country_code: str
    currency: str
    currency_name: str
    ip: str
    latitude: float
    longitude: float
    region: str
    timezone: str
