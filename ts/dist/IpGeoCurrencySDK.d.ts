import { ApiJsonEntity } from './entity/ApiJsonEntity';
import { CurrencyConversionEntity } from './entity/CurrencyConversionEntity';
import { CurrencyRateEntity } from './entity/CurrencyRateEntity';
import { JsonEntity } from './entity/JsonEntity';
export type * from './IpGeoCurrencyTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { IpGeoCurrencyEntityBase } from './IpGeoCurrencyEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class IpGeoCurrencySDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    ApiJson(entopts?: Record<string, any>): ApiJsonEntity;
    CurrencyConversion(entopts?: Record<string, any>): CurrencyConversionEntity;
    CurrencyRate(entopts?: Record<string, any>): CurrencyRateEntity;
    Json(entopts?: Record<string, any>): JsonEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): IpGeoCurrencySDK;
    tester(testopts?: any, sdkopts?: any): IpGeoCurrencySDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof IpGeoCurrencySDK;
export { stdutil, config, BaseFeature, IpGeoCurrencyEntityBase, IpGeoCurrencySDK, SDK, };
