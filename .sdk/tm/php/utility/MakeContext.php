<?php
declare(strict_types=1);

// IpGeoCurrency SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class IpGeoCurrencyMakeContext
{
    public static function call(array $ctxmap, ?IpGeoCurrencyContext $basectx): IpGeoCurrencyContext
    {
        return new IpGeoCurrencyContext($ctxmap, $basectx);
    }
}
