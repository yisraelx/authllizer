import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Authllizer, IAuthllizerOptions } from '@authllizer/core';
import { NgxHttpClient } from './ngx.http';

@NgModule({
    imports: [
        HttpClientModule
    ]
})
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
                deps: [HttpClient]
            }]
        };
    }
}
