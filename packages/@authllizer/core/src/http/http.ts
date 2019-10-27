import { IDirectory } from '../interface';

export interface IHttpRequestOptions {
    method?: string;
    data?: any;
    params?: IDirectory<any>;
    headers?: IDirectory<any>;
    withCredentials?: boolean;
}

export interface IHttpClient {
    request: IHttpRequestMethod;
}

export interface IHttpRequestMethod {
    <T>(url: string, options: IHttpRequestOptions): Promise<T>;
}
