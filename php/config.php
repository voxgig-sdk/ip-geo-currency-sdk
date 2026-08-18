<?php
declare(strict_types=1);

// IpGeoCurrency SDK configuration

class IpGeoCurrencyConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "IpGeoCurrency",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://apip.cc",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "api_json" => [],
                    "currency_conversion" => [],
                    "currency_rate" => [],
                    "json" => [],
                ],
            ],
            "entity" => [
        'api_json' => [
          'fields' => [
            [
              'name' => 'city',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'continent',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'continent_code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country_code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'currency',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'currency_name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ip',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'latitude',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'longitude',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'region',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'timezone',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'api_json',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => '8.8.8.8',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'ip_or_domain',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api-json/{ip-or-domain}',
                  'parts' => [
                    'api-json',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'ip-or-domain' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'currency_conversion' => [
          'fields' => [
            [
              'name' => 'amount',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'base',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'rate',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'result',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'target',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'currency_conversion',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 10,
                        'kind' => 'param',
                        'name' => 'amount',
                        'orig' => 'amount',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => 'gbp',
                        'kind' => 'param',
                        'name' => 'base',
                        'orig' => 'base',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'usd',
                        'kind' => 'param',
                        'name' => 'target',
                        'orig' => 'target',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api-rates/{amount}-{base}2{target}',
                  'parts' => [
                    'api-rates',
                    '{amount}_{base}2{target}',
                  ],
                  'rename' => [
                    'param' => [
                      'amount}-{base}2{target' => 'amount}_{base}2{target',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'amount',
                      'base',
                      'target',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'api_rate',
              ],
            ],
          ],
        ],
        'currency_rate' => [
          'fields' => [],
          'name' => 'currency_rate',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/rates.json',
                  'parts' => [
                    'rates.json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.rates`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'json' => [
          'fields' => [
            [
              'name' => 'city',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'continent',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'continent_code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country_code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'currency',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'currency_name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ip',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'latitude',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'longitude',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'region',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'timezone',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'json',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'nolog',
                        'orig' => 'nolog',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/json',
                  'parts' => [
                    'json',
                  ],
                  'select' => [
                    'exist' => [
                      'nolog',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return IpGeoCurrencyFeatures::make_feature($name);
    }
}
