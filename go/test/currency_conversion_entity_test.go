package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/ip-geo-currency-sdk/go"
	"github.com/voxgig-sdk/ip-geo-currency-sdk/go/core"

	vs "github.com/voxgig-sdk/ip-geo-currency-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const currency_conversionEntityLiveStrict = true


func TestCurrencyConversionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CurrencyConversion(nil)
		if ent == nil {
			t.Fatal("expected non-nil CurrencyConversionEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.CurrencyConversion(nil).Load(map[string]any{"amount": "x", "base": "x", "target": "x"}, nil)
		if sdkerr, ok := err.(*core.IpGeoCurrencyError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := currency_conversionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "currency_conversion." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _liveKey, _liveEx := range map[string]any{"amount01": float64(10), "base01": "gbp", "target01": "usd"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					setup.idmap[_liveKey] = _liveEx
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		currencyConversionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.currency_conversion")))
		var currencyConversionRef01Data map[string]any
		if len(currencyConversionRef01DataRaw) > 0 {
			currencyConversionRef01Data = core.ToMapAny(currencyConversionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = currencyConversionRef01Data

		// LOAD
		currencyConversionRef01Ent := client.CurrencyConversion(nil)
		currencyConversionRef01MatchDt0 := map[string]any{}
		if v := setup.idmap["amount"]; v != nil {
			currencyConversionRef01MatchDt0["amount"] = v
		} else {
			currencyConversionRef01MatchDt0["amount"] = setup.idmap["amount01"]
		}
		if v := setup.idmap["base"]; v != nil {
			currencyConversionRef01MatchDt0["base"] = v
		} else {
			currencyConversionRef01MatchDt0["base"] = setup.idmap["base01"]
		}
		if v := setup.idmap["target"]; v != nil {
			currencyConversionRef01MatchDt0["target"] = v
		} else {
			currencyConversionRef01MatchDt0["target"] = setup.idmap["target01"]
		}
		if !setup.live {
			switch v := currencyConversionRef01Data["amount"].(type) {
			case string, bool, float64, int, int64:
				currencyConversionRef01MatchDt0["amount"] = v
			}
			switch v := currencyConversionRef01Data["base"].(type) {
			case string, bool, float64, int, int64:
				currencyConversionRef01MatchDt0["base"] = v
			}
			switch v := currencyConversionRef01Data["target"].(type) {
			case string, bool, float64, int, int64:
				currencyConversionRef01MatchDt0["target"] = v
			}
		}
		currencyConversionRef01DataDt0Loaded, err := currencyConversionRef01Ent.Load(currencyConversionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if currencyConversionRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func currency_conversionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "currency_conversion", "CurrencyConversionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read currency_conversion test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse currency_conversion test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"currency_conversion01", "currency_conversion02", "currency_conversion03", "amount01", "base01", "target01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("IP_GEO_CURRENCY_TEST_CURRENCY_CONVERSION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"IP_GEO_CURRENCY_TEST_CURRENCY_CONVERSION_ENTID": idmap,
		"IP_GEO_CURRENCY_TEST_LIVE":      "FALSE",
		"IP_GEO_CURRENCY_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["IP_GEO_CURRENCY_TEST_CURRENCY_CONVERSION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["IP_GEO_CURRENCY_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
		})
		client = sdk.NewIpGeoCurrencySDK(core.ToMapAny(mergedOpts))
	}

	live := env["IP_GEO_CURRENCY_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["IP_GEO_CURRENCY_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
