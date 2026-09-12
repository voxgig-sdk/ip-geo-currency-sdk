import { IpGeoCurrencyEntityBase } from '../IpGeoCurrencyEntityBase';
import type { IpGeoCurrencySDK } from '../IpGeoCurrencySDK';
import type { Control } from '../types';
import type { Json, JsonLoadMatch } from '../IpGeoCurrencyTypes';
declare class JsonEntity extends IpGeoCurrencyEntityBase<Json> {
    constructor(client: IpGeoCurrencySDK, entopts: any);
    make(this: JsonEntity): JsonEntity;
    load(this: any, reqmatch?: JsonLoadMatch, ctrl?: Control): Promise<JsonEntity>;
}
export { JsonEntity };
