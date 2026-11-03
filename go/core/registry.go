package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewApiJsonEntityFunc func(client *IpGeoCurrencySDK, entopts map[string]any) IpGeoCurrencyEntityBase

var NewCurrencyConversionEntityFunc func(client *IpGeoCurrencySDK, entopts map[string]any) IpGeoCurrencyEntityBase

var NewCurrencyRateEntityFunc func(client *IpGeoCurrencySDK, entopts map[string]any) IpGeoCurrencyEntityBase

var NewJsonEntityFunc func(client *IpGeoCurrencySDK, entopts map[string]any) IpGeoCurrencyEntityBase

