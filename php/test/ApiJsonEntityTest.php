<?php
declare(strict_types=1);

// ApiJson entity test

require_once __DIR__ . '/../ipgeocurrency_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ApiJsonEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = IpGeoCurrencySDK::test(null, null);
        $ent = $testsdk->ApiJson(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = api_json_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "api_json." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set IPGEOCURRENCY_TEST_API_JSON_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $api_json_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.api_json")));
        $api_json_ref01_data = null;
        if (count($api_json_ref01_data_raw) > 0) {
            $api_json_ref01_data = Helpers::to_map($api_json_ref01_data_raw[0][1]);
        }

        // LOAD
        $api_json_ref01_ent = $client->ApiJson(null);
        $api_json_ref01_match_dt0 = [];
        [$api_json_ref01_data_dt0_loaded, $err] = $api_json_ref01_ent->load($api_json_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($api_json_ref01_data_dt0_loaded);

    }
}

function api_json_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/api_json/ApiJsonTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = IpGeoCurrencySDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["api_json01", "api_json02", "api_json03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("IPGEOCURRENCY_TEST_API_JSON_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "IPGEOCURRENCY_TEST_API_JSON_ENTID" => $idmap,
        "IPGEOCURRENCY_TEST_LIVE" => "FALSE",
        "IPGEOCURRENCY_TEST_EXPLAIN" => "FALSE",
        "IPGEOCURRENCY_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["IPGEOCURRENCY_TEST_API_JSON_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["IPGEOCURRENCY_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["IPGEOCURRENCY_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new IpGeoCurrencySDK(Helpers::to_map($merged_opts));
    }

    $live = $env["IPGEOCURRENCY_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["IPGEOCURRENCY_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
