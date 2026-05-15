<?php
declare(strict_types=1);

// IpGeoCurrency SDK utility: result_headers

class IpGeoCurrencyResultHeaders
{
    public static function call(IpGeoCurrencyContext $ctx): ?IpGeoCurrencyResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
