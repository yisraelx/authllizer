import extend from '../utils/extend';
import isObject from '../utils/is-object';
import { BaseHttpClient } from './base';
import { IHttpRequestOptions } from './http';

// for fetch global scope error 'TypeError: Failed to execute 'fetch' on 'Window': Illegal invocation'
// can be 'fetch.bind(this)' to solve the error.
let fetchBind = (input, init?) => fetch(input, init);

/**
 * @resource https://fetch.spec.whatwg.org
 * @see https://mdn.io/fetch
 */
export class FetchHttpClient extends BaseHttpClient {

    protected _client: typeof fetch;

    constructor(client: typeof fetch = (typeof fetch !== 'undefined' && fetchBind)) {
        super(client);
    }

    public request<TResponse>(url: string, options: IHttpRequestOptions): Promise<TResponse> {

        let { method, data, params, headers = {}, withCredentials } = options;

        url = FetchHttpClient.extendUrlQuery(url, params);
        let credentials = (withCredentials === true && 'include') || (withCredentials === false && 'same-origin') || 'omit' as any;

        // Other types of data can be supported
        if (!headers['Content-Type'] && isObject(data)) {
            headers = extend({
                'Content-Type': 'application/json'
            }, headers);

            data = JSON.stringify(data);
        }

        let requestOptions: RequestInit = {
            method,
            body: data,
            credentials,
            headers
        };

        return this
            ._client(url, requestOptions)
            .then((response: Response) => {
                if (response.ok) {
                    return response.json();
                }

                throw response;
            });
    }

}
