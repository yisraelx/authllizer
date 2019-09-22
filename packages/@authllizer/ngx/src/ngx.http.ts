import { HttpClient } from '@angular/common/http';
import { BaseHttpClient, IHttpRequestOptions } from '@authllizer/core';

export class NgxHttpClient extends BaseHttpClient {

    protected _client: HttpClient;

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    public request<T>(url: string, options: IHttpRequestOptions): Promise<T> {
        let {method, data, params, headers, withCredentials} = options;
        return this._client.request(method, url, {
            body: data,
            params,
            headers,
            withCredentials
        }).toPromise() as any;
    }
}
