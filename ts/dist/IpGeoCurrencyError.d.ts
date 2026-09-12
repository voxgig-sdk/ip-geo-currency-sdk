import { Context } from './Context';
declare class IpGeoCurrencyError extends Error {
    isIpGeoCurrencyError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { IpGeoCurrencyError };
