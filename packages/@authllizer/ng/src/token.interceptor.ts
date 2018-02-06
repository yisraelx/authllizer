import { IHttpInterceptor, IRequestConfig } from 'angular';
import { Authllizer } from '@authllizer/core';

export class TokenInterceptor implements IHttpInterceptor {

    static $inject = ['$auth'];

    constructor(private $auth: Authllizer) {
    }

    request = (config: IRequestConfig): IRequestConfig => {

        let { headers, url } = config;

        if (!headers['Authorization'] && this.$auth.toIntercept(url)) {
            headers['Authorization'] = this.$auth.getToken().toHeader();
        }

        return config;

    }
}
