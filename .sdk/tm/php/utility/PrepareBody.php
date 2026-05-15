<?php
declare(strict_types=1);

// IpGeoCurrency SDK utility: prepare_body

class IpGeoCurrencyPrepareBody
{
    public static function call(IpGeoCurrencyContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
