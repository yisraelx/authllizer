import { ModuleWithProviders, NgModule } from '@angular/core';
import { IAuthllizerOptions } from '@authllizer/core';
import { AUTHLLIZER_OPTIONS, AUTHLLIZER_PROVIDER } from './authllizer.provider';

@NgModule({
    providers: [
        AUTHLLIZER_PROVIDER
    ]
})
export class AuthllizerModule {

    static forRoot(options: IAuthllizerOptions): ModuleWithProviders {
        return {
            ngModule: AuthllizerModule,
            providers: [
                { provide: AUTHLLIZER_OPTIONS, useValue: options }
            ]
        };
    }

}
