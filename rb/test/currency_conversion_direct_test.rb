# CurrencyConversion direct test

require "minitest/autorun"
require "json"
require_relative "../IpGeoCurrency_sdk"
require_relative "runner"

class CurrencyConversionDirectTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def live_ok(result)
    status = Helpers.to_int(result["status"])
    result["err"].nil? && result["ok"] && status >= 200 && status < 300
  end

  def test_direct_load_currency_conversion
    setup = currency_conversion_direct_setup({ "id" => "direct01" })
    _should_skip, _reason = Runner.is_control_skipped("direct", "direct-load-currency_conversion", setup[:live] ? "live" : "unit")
    if _should_skip
      skip(_reason || "skipped via sdk-test-control.json")
      return
    end
    client = setup[:client]

    params = {}
    query = {}
    if setup[:live]
      params["amount"] = 10
      params["base"] = "gbp"
      params["target"] = "usd"
    else
      params["amount"] = "direct01"
      params["base"] = "direct02"
      params["target"] = "direct03"
    end

    result = client.direct({
      "path" => "api-rates/{amount}-{base}2{target}",
      "method" => "GET",
      "params" => params,
      "query" => query,
    })
    if setup[:live]
      unless live_ok(result)
        Runner.live_miss(LIVE_STRICT, "Live load failed: " + Runner.live_describe(result))
      end
      if result["data"].nil?
        Runner.live_miss(LIVE_STRICT, "Live load returned no data: " + Runner.live_describe(result))
      end
      assert !result["data"].nil?
    else
      assert_nil result["err"]
      assert result["ok"]
      assert_equal 200, Helpers.to_int(result["status"])
      assert !result["data"].nil?
      if result["data"].is_a?(Hash)
        assert_equal "direct01", result["data"]["id"]
      end
      assert_equal 1, setup[:calls].length
    end
  end

end


def currency_conversion_direct_setup(mockres)
  Runner.load_env_local

  calls = []

  env = Runner.env_override({
    "IP_GEO_CURRENCY_TEST_CURRENCY_CONVERSION_ENTID" => {},
    "IP_GEO_CURRENCY_TEST_LIVE" => "FALSE",
  })

  live = env["IP_GEO_CURRENCY_TEST_LIVE"] == "TRUE"

  if live
    # Merged so the generated fields win: sdk-test-control.json's
    # test.client.options adds to the live client, it does not redirect it.
    merged_opts = Runner.live_client_options.merge({
    })
    client = IpGeoCurrencySDK.new(merged_opts)
    idmap = env["IP_GEO_CURRENCY_TEST_CURRENCY_CONVERSION_ENTID"]
    # A path parameter's example stands in for an id *_ENTID does not give.
    idmap = { "amount01" => 10, "base01" => "gbp", "target01" => "usd" }
      .merge(idmap.is_a?(Hash) ? idmap : {})
    return {
      client: client,
      calls: calls,
      live: true,
      idmap: idmap.is_a?(Hash) ? idmap : {},
    }
  end

  mock_fetch = ->(url, init) {
    calls.push({ "url" => url, "init" => init })
    return {
      "status" => 200,
      "statusText" => "OK",
      "headers" => {},
      "json" => ->() {
        if !mockres.nil?
          return mockres
        end
        return { "id" => "direct01" }
      },
      "body" => "mock",
    }, nil
  }

  client = IpGeoCurrencySDK.new({
    "base" => "http://localhost:8080",
    "system" => {
      "fetch" => mock_fetch,
    },
  })

  {
    client: client,
    calls: calls,
    live: false,
    idmap: {},
  }
end
