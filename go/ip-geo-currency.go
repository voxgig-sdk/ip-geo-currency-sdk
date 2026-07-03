package voxgigipgeocurrencysdk

import (
	"github.com/voxgig-sdk/ip-geo-currency-sdk/go/core"
	"github.com/voxgig-sdk/ip-geo-currency-sdk/go/entity"
	"github.com/voxgig-sdk/ip-geo-currency-sdk/go/feature"
	_ "github.com/voxgig-sdk/ip-geo-currency-sdk/go/utility"
)

// Type aliases preserve external API.
type IpGeoCurrencySDK = core.IpGeoCurrencySDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type IpGeoCurrencyEntity = core.IpGeoCurrencyEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type IpGeoCurrencyError = core.IpGeoCurrencyError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewApiJsonEntityFunc = func(client *core.IpGeoCurrencySDK, entopts map[string]any) core.IpGeoCurrencyEntity {
		return entity.NewApiJsonEntity(client, entopts)
	}
	core.NewCurrencyConversionEntityFunc = func(client *core.IpGeoCurrencySDK, entopts map[string]any) core.IpGeoCurrencyEntity {
		return entity.NewCurrencyConversionEntity(client, entopts)
	}
	core.NewCurrencyRateEntityFunc = func(client *core.IpGeoCurrencySDK, entopts map[string]any) core.IpGeoCurrencyEntity {
		return entity.NewCurrencyRateEntity(client, entopts)
	}
	core.NewJsonEntityFunc = func(client *core.IpGeoCurrencySDK, entopts map[string]any) core.IpGeoCurrencyEntity {
		return entity.NewJsonEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewIpGeoCurrencySDK = core.NewIpGeoCurrencySDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewIpGeoCurrencySDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *IpGeoCurrencySDK  { return NewIpGeoCurrencySDK(nil) }
func Test() *IpGeoCurrencySDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
