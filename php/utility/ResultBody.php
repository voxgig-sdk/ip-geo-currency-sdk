<?php
declare(strict_types=1);

// IpGeoCurrency SDK utility: result_body

class IpGeoCurrencyResultBody
{
    public static function call(IpGeoCurrencyContext $ctx): ?IpGeoCurrencyResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
