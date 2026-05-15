<?php
declare(strict_types=1);

// IpGeoCurrency SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class IpGeoCurrencyFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new IpGeoCurrencyBaseFeature();
            case "test":
                return new IpGeoCurrencyTestFeature();
            default:
                return new IpGeoCurrencyBaseFeature();
        }
    }
}
