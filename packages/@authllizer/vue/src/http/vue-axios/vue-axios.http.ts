import {BaseHttpClient, IHttpRequestOptions} from '@authllizer/core';
import Vue from 'vue';

export class VueAxiosHttpClient extends BaseHttpClient {

    constructor() {
        super((...args) => {
            return (Vue as any).axios(...args);
        });
    }

    public request<T>(url: string, config: IHttpRequestOptions): Promise<T> {
        (config as any).url = url;
        return this._client(config).then((response) => response.data) as any;
    }
}
