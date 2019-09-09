import { BaseHttpClient, IHttpRequestOptions } from '@authllizer/core';
import Vue from 'vue';

export class VueResourceHttpClient extends BaseHttpClient {

    constructor() {
        super((...args) => {
            return (Vue as any).resource(...args);
        });
    }

    request<T>(url: string, options: IHttpRequestOptions): Promise<T> {
        let {method, data, params, headers, withCredentials} = options;
        let requestOptions = {
            method,
            url,
            body: data,
            params,
            headers,
            credentials: withCredentials
        };

        return this
            ._client(requestOptions)
            .then((response) => response.json());
    }

}
