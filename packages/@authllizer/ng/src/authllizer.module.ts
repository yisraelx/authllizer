import {IAngularStatic} from 'angular';
import {TokenInterceptor} from './token.interceptor';
import {AuthProvider} from './auth.provider';

declare let angular: IAngularStatic;

export let moduleName = 'authllizer';

angular.module(moduleName, [])
    .provider('$auth', AuthProvider)
    .service('tokenInterceptor', TokenInterceptor);
