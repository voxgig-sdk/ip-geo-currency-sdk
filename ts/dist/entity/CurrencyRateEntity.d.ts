import { IpGeoCurrencyEntityBase } from '../IpGeoCurrencyEntityBase';
import type { IpGeoCurrencySDK } from '../IpGeoCurrencySDK';
import type { Control } from '../types';
import type { CurrencyRate, CurrencyRateLoadMatch } from '../IpGeoCurrencyTypes';
declare class CurrencyRateEntity extends IpGeoCurrencyEntityBase<CurrencyRate> {
    constructor(client: IpGeoCurrencySDK, entopts: any);
    make(this: CurrencyRateEntity): CurrencyRateEntity;
    load(this: any, reqmatch?: CurrencyRateLoadMatch, ctrl?: Control): Promise<CurrencyRateEntity>;
}
export { CurrencyRateEntity };
