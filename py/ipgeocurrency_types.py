# Typed models for the IpGeoCurrency SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class ApiJson:
    city: Optional[str] = None
    continent: Optional[str] = None
    continent_code: Optional[str] = None
    country: Optional[str] = None
    country_code: Optional[str] = None
    currency: Optional[str] = None
    currency_name: Optional[str] = None
    ip: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    region: Optional[str] = None
    timezone: Optional[str] = None


@dataclass
class ApiJsonLoadMatch:
    id: str


@dataclass
class CurrencyConversion:
    amount: Optional[float] = None
    base: Optional[str] = None
    rate: Optional[float] = None
    result: Optional[float] = None
    target: Optional[str] = None


@dataclass
class CurrencyConversionLoadMatch:
    amount: float
    base: str
    target: str


@dataclass
class CurrencyRate:
    base: Optional[str] = None
    date: Optional[str] = None
    rate: Optional[dict] = None


@dataclass
class CurrencyRateLoadMatch:
    base: Optional[str] = None
    date: Optional[str] = None
    rate: Optional[dict] = None


@dataclass
class Json:
    city: Optional[str] = None
    continent: Optional[str] = None
    continent_code: Optional[str] = None
    country: Optional[str] = None
    country_code: Optional[str] = None
    currency: Optional[str] = None
    currency_name: Optional[str] = None
    ip: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    region: Optional[str] = None
    timezone: Optional[str] = None


@dataclass
class JsonLoadMatch:
    city: Optional[str] = None
    continent: Optional[str] = None
    continent_code: Optional[str] = None
    country: Optional[str] = None
    country_code: Optional[str] = None
    currency: Optional[str] = None
    currency_name: Optional[str] = None
    ip: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    region: Optional[str] = None
    timezone: Optional[str] = None

