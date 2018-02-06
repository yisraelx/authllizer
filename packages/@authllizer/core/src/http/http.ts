import { Directory } from '../interface';

export interface IHttpRequestOptions {
    method?: string;
    data?: any;
    params?: Directory<any>;
    headers?: Directory<any>;
    withCredentials?: boolean;
}

export interface IHttpClient {
    request: IHttpRequestMethod;
}

export interface IHttpRequestMethod {
    <T>(url: string, options: IHttpRequestOptions): Promise<T>;
}
