<?php
declare(strict_types=1);

// IpGeoCurrency SDK utility: feature_add

class IpGeoCurrencyFeatureAdd
{
    public static function call(IpGeoCurrencyContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
