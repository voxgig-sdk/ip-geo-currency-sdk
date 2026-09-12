import { IpGeoCurrencyEntityBase } from '../IpGeoCurrencyEntityBase';
import type { IpGeoCurrencySDK } from '../IpGeoCurrencySDK';
import type { Control } from '../types';
import type { CurrencyConversion, CurrencyConversionLoadMatch } from '../IpGeoCurrencyTypes';
declare class CurrencyConversionEntity extends IpGeoCurrencyEntityBase<CurrencyConversion> {
    constructor(client: IpGeoCurrencySDK, entopts: any);
    make(this: CurrencyConversionEntity): CurrencyConversionEntity;
    load(this: any, reqmatch?: CurrencyConversionLoadMatch, ctrl?: Control): Promise<CurrencyConversionEntity>;
}
export { CurrencyConversionEntity };
