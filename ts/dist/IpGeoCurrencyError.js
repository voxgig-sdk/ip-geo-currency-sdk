"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpGeoCurrencyError = void 0;
class IpGeoCurrencyError extends Error {
    isIpGeoCurrencyError = true;
    sdk = 'IpGeoCurrency';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.IpGeoCurrencyError = IpGeoCurrencyError;
//# sourceMappingURL=IpGeoCurrencyError.js.map