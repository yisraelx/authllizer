import { HttpClient } from '@angular/common/http';
import { Inject, InjectionToken, Optional, Provider } from '@angular/core';
import { Authllizer, IAuthllizerOptions } from '@authllizer/core';
import { NgxHttpClient } from './ngx.http';

export const AUTHLLIZER_OPTIONS: InjectionToken<IAuthllizerOptions> = new InjectionToken('AuthllizerOptions');

export function AUTHLLIZER_PROVIDER_FACTORY(options?: IAuthllizerOptions, httpClient?: HttpClient): Authllizer {
    options = options || {};
    options.httpClient = options.httpClient || new NgxHttpClient(httpClient);

    return new Authllizer(options);
}

export const AUTHLLIZER_PROVIDER: Provider = {
    provide: Authllizer,
    useFactory: AUTHLLIZER_PROVIDER_FACTORY,
    deps: [[new Optional(), new Inject(AUTHLLIZER_OPTIONS)], [new Optional(), HttpClient]]
};
