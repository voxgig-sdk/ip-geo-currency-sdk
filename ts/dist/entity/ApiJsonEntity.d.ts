import { IpGeoCurrencyEntityBase } from '../IpGeoCurrencyEntityBase';
import type { IpGeoCurrencySDK } from '../IpGeoCurrencySDK';
import type { Control } from '../types';
import type { ApiJson, ApiJsonLoadMatch } from '../IpGeoCurrencyTypes';
declare class ApiJsonEntity extends IpGeoCurrencyEntityBase<ApiJson> {
    constructor(client: IpGeoCurrencySDK, entopts: any);
    make(this: ApiJsonEntity): ApiJsonEntity;
    load(this: any, reqmatch?: ApiJsonLoadMatch, ctrl?: Control): Promise<ApiJsonEntity>;
}
export { ApiJsonEntity };
