// Typed models for the IpGeoCurrency SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/ip-geo-currency-sdk/go/core"
)

// ApiJson is the typed data model for the api_json entity.
type ApiJson struct {
	City *string `json:"city,omitempty"`
	Continent *string `json:"continent,omitempty"`
	ContinentCode *string `json:"continent_code,omitempty"`
	Country *string `json:"country,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	Currency *string `json:"currency,omitempty"`
	CurrencyName *string `json:"currency_name,omitempty"`
	Ip *string `json:"ip,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Region *string `json:"region,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
}

// ApiJsonLoadMatch is the typed request payload for ApiJson.LoadTyped.
type ApiJsonLoadMatch struct {
	Id string `json:"id"`
}

// CurrencyConversion is the typed data model for the currency_conversion entity.
type CurrencyConversion struct {
	Amount *float64 `json:"amount,omitempty"`
	Base *string `json:"base,omitempty"`
	Rate *float64 `json:"rate,omitempty"`
	Result *float64 `json:"result,omitempty"`
	Target *string `json:"target,omitempty"`
}

// CurrencyConversionLoadMatch is the typed request payload for CurrencyConversion.LoadTyped.
type CurrencyConversionLoadMatch struct {
	Amount float64 `json:"amount"`
	Base string `json:"base"`
	Target string `json:"target"`
}

// CurrencyRate is the typed data model for the currency_rate entity.
type CurrencyRate struct {
}

// CurrencyRateLoadMatch is the typed request payload for CurrencyRate.LoadTyped.
type CurrencyRateLoadMatch struct {
}

// Json is the typed data model for the json entity.
type Json struct {
	City *string `json:"city,omitempty"`
	Continent *string `json:"continent,omitempty"`
	ContinentCode *string `json:"continent_code,omitempty"`
	Country *string `json:"country,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	Currency *string `json:"currency,omitempty"`
	CurrencyName *string `json:"currency_name,omitempty"`
	Ip *string `json:"ip,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Region *string `json:"region,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
}

// JsonLoadMatch is the typed request payload for Json.LoadTyped.
type JsonLoadMatch struct {
	City *string `json:"city,omitempty"`
	Continent *string `json:"continent,omitempty"`
	ContinentCode *string `json:"continent_code,omitempty"`
	Country *string `json:"country,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	Currency *string `json:"currency,omitempty"`
	CurrencyName *string `json:"currency_name,omitempty"`
	Ip *string `json:"ip,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Region *string `json:"region,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
