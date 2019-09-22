import { extend, IHttpService } from 'angular';
import { Authllizer, IAuthllizerOptions } from '@authllizer/core';
import { NgHttpClient } from './ng.http';

export class AuthProvider {

    protected _options: IAuthllizerOptions = {};

    public config(options: IAuthllizerOptions) {
        extend(this._options, options);
    }

    public $get($injector): Authllizer {
        let { _options: options } = this;

        let client = ((...args) => {
            return $injector.get('$http')(...args);
        }) as IHttpService;

        options.httpClient = options.httpClient || new NgHttpClient(client);

        return new Authllizer(options);
    }
}

AuthProvider.prototype.$get.$inject = ['$injector', '$q'];
