-- CurrencyConversion entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("ip-geo-currency_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("CurrencyConversionEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:CurrencyConversion(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:CurrencyConversion(nil):load({ ["amount"] = "x", ["base"] = "x", ["target"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = currency_conversion_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "currency_conversion." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live then
      for _live_key, _live_ex in pairs({["amount01"] = 10, ["base01"] = "gbp", ["target01"] = "usd"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          setup.idmap[_live_key] = _live_ex
        end
      end
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local currency_conversion_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.currency_conversion")))
    local currency_conversion_ref01_data = nil
    if #currency_conversion_ref01_data_raw > 0 then
      currency_conversion_ref01_data = helpers.to_map(currency_conversion_ref01_data_raw[1][2])
    end

    -- LOAD
    local currency_conversion_ref01_ent = client:CurrencyConversion(nil)
    local currency_conversion_ref01_match_dt0 = {}
    currency_conversion_ref01_match_dt0["amount"] = setup.idmap["amount"] or setup.idmap["amount01"]
    currency_conversion_ref01_match_dt0["base"] = setup.idmap["base"] or setup.idmap["base01"]
    currency_conversion_ref01_match_dt0["target"] = setup.idmap["target"] or setup.idmap["target01"]
    if not setup.live then
      do
        local own = currency_conversion_ref01_data["amount"]
        if type(own) == "string" or type(own) == "number" or type(own) == "boolean" then
          currency_conversion_ref01_match_dt0["amount"] = own
        end
      end
      do
        local own = currency_conversion_ref01_data["base"]
        if type(own) == "string" or type(own) == "number" or type(own) == "boolean" then
          currency_conversion_ref01_match_dt0["base"] = own
        end
      end
      do
        local own = currency_conversion_ref01_data["target"]
        if type(own) == "string" or type(own) == "number" or type(own) == "boolean" then
          currency_conversion_ref01_match_dt0["target"] = own
        end
      end
    end
    local currency_conversion_ref01_data_dt0_loaded, err = currency_conversion_ref01_ent:load(currency_conversion_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(currency_conversion_ref01_data_dt0_loaded)

  end)
end)

function currency_conversion_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/currency_conversion/CurrencyConversionTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read currency_conversion test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "currency_conversion01", "currency_conversion02", "currency_conversion03", "amount01", "base01", "target01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("IP_GEO_CURRENCY_TEST_CURRENCY_CONVERSION_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["IP_GEO_CURRENCY_TEST_CURRENCY_CONVERSION_ENTID"] = idmap,
    ["IP_GEO_CURRENCY_TEST_LIVE"] = "FALSE",
    ["IP_GEO_CURRENCY_TEST_EXPLAIN"] = "FALSE",
  })

  local idmap_resolved = helpers.to_map(
    env["IP_GEO_CURRENCY_TEST_CURRENCY_CONVERSION_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["IP_GEO_CURRENCY_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["IP_GEO_CURRENCY_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["IP_GEO_CURRENCY_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
