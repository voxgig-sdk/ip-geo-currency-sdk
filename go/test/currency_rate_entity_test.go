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

func TestCurrencyRateEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CurrencyRate(nil)
		if ent == nil {
			t.Fatal("expected non-nil CurrencyRateEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := currency_rateBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "currency_rate." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set IPGEOCURRENCY_TEST_CURRENCY_RATE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		currencyRateRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.currency_rate", setup.data)))
		var currencyRateRef01Data map[string]any
		if len(currencyRateRef01DataRaw) > 0 {
			currencyRateRef01Data = core.ToMapAny(currencyRateRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = currencyRateRef01Data

		// LOAD
		currencyRateRef01Ent := client.CurrencyRate(nil)
		currencyRateRef01MatchDt0 := map[string]any{}
		currencyRateRef01DataDt0Loaded, err := currencyRateRef01Ent.Load(currencyRateRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if currencyRateRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func currency_rateBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "currency_rate", "CurrencyRateTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read currency_rate test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse currency_rate test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"currency_rate01", "currency_rate02", "currency_rate03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("IPGEOCURRENCY_TEST_CURRENCY_RATE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"IPGEOCURRENCY_TEST_CURRENCY_RATE_ENTID": idmap,
		"IPGEOCURRENCY_TEST_LIVE":      "FALSE",
		"IPGEOCURRENCY_TEST_EXPLAIN":   "FALSE",
		"IPGEOCURRENCY_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["IPGEOCURRENCY_TEST_CURRENCY_RATE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["IPGEOCURRENCY_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["IPGEOCURRENCY_APIKEY"],
			},
			extra,
		})
		client = sdk.NewIpGeoCurrencySDK(core.ToMapAny(mergedOpts))
	}

	live := env["IPGEOCURRENCY_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["IPGEOCURRENCY_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
