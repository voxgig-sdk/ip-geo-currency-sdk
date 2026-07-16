<?php
declare(strict_types=1);

// IpGeoCurrency SDK base feature

class IpGeoCurrencyBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(IpGeoCurrencyContext $ctx, array $options): void {}
    public function PostConstruct(IpGeoCurrencyContext $ctx): void {}
    public function PostConstructEntity(IpGeoCurrencyContext $ctx): void {}
    public function SetData(IpGeoCurrencyContext $ctx): void {}
    public function GetData(IpGeoCurrencyContext $ctx): void {}
    public function GetMatch(IpGeoCurrencyContext $ctx): void {}
    public function SetMatch(IpGeoCurrencyContext $ctx): void {}
    public function PrePoint(IpGeoCurrencyContext $ctx): void {}
    public function PreSpec(IpGeoCurrencyContext $ctx): void {}
    public function PreRequest(IpGeoCurrencyContext $ctx): void {}
    public function PreResponse(IpGeoCurrencyContext $ctx): void {}
    public function PreResult(IpGeoCurrencyContext $ctx): void {}
    public function PreDone(IpGeoCurrencyContext $ctx): void {}
    public function PreUnexpected(IpGeoCurrencyContext $ctx): void {}
}
