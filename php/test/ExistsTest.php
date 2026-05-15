<?php
declare(strict_types=1);

// IpGeoCurrency SDK exists test

require_once __DIR__ . '/../ipgeocurrency_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = IpGeoCurrencySDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
