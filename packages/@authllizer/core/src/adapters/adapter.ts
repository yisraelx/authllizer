import { IHttpClient } from '../http/http';
import { IDirectory } from '../interface';
import { IToken } from '../tokens/token';

export interface IAdapterRequestOptions {
    type?: AdapterRequestType;
    data?: IDirectory<any>;
    extractToken?: boolean;
    token?: IToken;
    provider?: string;
}

export enum AdapterRequestType {
    signIn = 'signIn',
    signUp = 'signUp',
    signOut = 'signOut',
    authenticate = 'authenticate',
    link = 'link',
    unlink = 'unlink',
    refresh = 'refresh'
}

export interface IAdapterResponse<T> {
    response?: T;
    token?: string;
}

export interface IAdapterConstructor {
    readonly prototype: IAdapter;
    new(httpClient: IHttpClient): IAdapter;
}

export interface IAdapter {
    request<T>(IAdapterRequestOptions): Promise<IAdapterResponse<T>>;
}
