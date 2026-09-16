package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewApiJsonEntityFunc func(client *IpGeoCurrencySDK, entopts map[string]any) IpGeoCurrencyEntity

var NewCurrencyConversionEntityFunc func(client *IpGeoCurrencySDK, entopts map[string]any) IpGeoCurrencyEntity

var NewCurrencyRateEntityFunc func(client *IpGeoCurrencySDK, entopts map[string]any) IpGeoCurrencyEntity

var NewJsonEntityFunc func(client *IpGeoCurrencySDK, entopts map[string]any) IpGeoCurrencyEntity

