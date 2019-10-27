import { IDirectory } from '../interface';
import extendUrlQuery from '../utils/extend-url-query';
import { IHttpClient, IHttpRequestOptions } from './http';

export abstract class BaseHttpClient implements IHttpClient {

    static extendUrlQuery(url: string, params: IDirectory<any>) {
        return extendUrlQuery(url, params);
    }

    protected _client: any;

    constructor(client?: any) {
        this._client = client;
    }

    public abstract request<T>(url: string, options: IHttpRequestOptions): Promise<T>;
}

