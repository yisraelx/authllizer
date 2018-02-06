import { extend, IHttpService, IQService } from 'angular';
import { Authllizer, IAuthllizerOptions, Config } from '@authllizer/core';
import { NgHttpClient } from './ng.http';

export class AuthProvider {

    protected _options: IAuthllizerOptions = {};

    public config(options: IAuthllizerOptions) {
        extend(this._options, options);
    }

    public $get($injector, $q: IQService): Authllizer {
        let { _options: options } = this;

        Config.Promise = $q as any;

        let client = ((...args) => {
            return $injector.get('$http')(...args);
        }) as IHttpService;

        options.httpClient = options.httpClient || new NgHttpClient(client);

        return new Authllizer(options);
    }
}

AuthProvider.prototype.$get.$inject = ['$injector', '$q'];
