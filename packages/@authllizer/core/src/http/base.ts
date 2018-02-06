import { Directory } from '../interface';
import { IHttpClient, IHttpRequestOptions } from './http';
import  extendUrlQuery  from '../utils/extend-url-query';

export abstract class BaseHttpClient implements IHttpClient {


    static extendUrlQuery(url: string, params: Directory<any>) {
        return extendUrlQuery(url, params);
    }

    protected _client: any;

    constructor(client?: any) {
        this._client = client;
    }

    public abstract request<T>(url: string, options: IHttpRequestOptions): Promise<T>;
}

