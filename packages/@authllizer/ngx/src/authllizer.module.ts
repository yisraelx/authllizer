import { ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Authllizer, IAuthllizerOptions } from '@authllizer/core';
import { NgxHttpClient } from './ngx.http';

@NgModule({})
export class AuthllizerModule {
    static forRoot(options: IAuthllizerOptions): ModuleWithProviders {
        return {
            ngModule: AuthllizerModule,
            providers: [{
                provide: Authllizer,
                useFactory(http: HttpClient) {
                    options.httpClient = options.httpClient || new NgxHttpClient(http);
                    return new Authllizer(options);
                },
                deps: [[new Optional(), HttpClient]]
            }]
        };
    }
}
