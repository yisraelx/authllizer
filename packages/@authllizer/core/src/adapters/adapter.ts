import {Directory} from '../interface';
import {IToken} from '../tokens/token';
import {IHttpClient} from '../http/http';

export interface IAdapterRequestOptions {
    type?: AdapterRequestType;
    data?: Directory<any>;
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
    new(httpClient: IHttpClient): IAdapter;

    readonly prototype: IAdapter;
}

export interface IAdapter {
    request<T>(IAdapterRequestOptions): Promise<IAdapterResponse<T>>;
}
