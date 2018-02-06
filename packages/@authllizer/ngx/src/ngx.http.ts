import { IHttpRequestOptions, BaseHttpClient } from '@authllizer/core';
import { HttpClient } from '@angular/common/http';

export class NgxHttpClient extends BaseHttpClient {

    protected _client: HttpClient;

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    public request<T>(url: string, options: IHttpRequestOptions): Promise<T> {
        let { method, data, params, headers, withCredentials } = options;
        return this._client.request(method, url, {
            body: data,
            params,
            headers,
            withCredentials
        }).toPromise() as any;
    }
}
