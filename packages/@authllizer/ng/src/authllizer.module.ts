import { IAngularStatic } from 'angular';
import { AuthProvider } from './auth.provider';
import { TokenInterceptor } from './token.interceptor';

declare let angular: IAngularStatic;

export let moduleName = 'authllizer';

angular
    .module(moduleName, [])
    .provider('$auth', AuthProvider)
    .service('tokenInterceptor', TokenInterceptor);
