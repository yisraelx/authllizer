# AngularJs Authllizer Module
[![Source Code](https://img.shields.io/badge/%3C/%3E-source--code-blue.svg)](https://github.com/yisraelx/authllizer/blob/master/packages/@authllizer/ng)
[![Version](https://img.shields.io/npm/v/@authllizer/ng.svg)](https://www.npmjs.com/package/@authllizer/ng)
[![MIT License](https://img.shields.io/npm/l/@authllizer/ng.svg?color=yellow)](https://github.com/yisraelx/authllizer/blob/master/LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/min/@authllizer/ng.svg?color=green)](https://bundlephobia.com/result?p=@authllizer/ng)
[![TypeScript](https://img.shields.io/badge/100%25-TypeScript-blue.svg)](https://www.typescriptlang.org)

**This module is a wrapper of [Authllizer] for comfortable using it in [AngularJs].**

## Example
There are AngularJs example project in the [source code](https://github.com/yisraelx/authllizer/blob/master/examples/ng).

## Install
```sh
$ npm install --save @authllizer/ng
# and install peer dependencies 
$ npm install --save @authllizer/core
```

## Setup
```ts
import * as angular from 'angular';
import { default as AuthllizerModule } from '@authllizer/ng';
let appModule = angular.module('myApp', [ AuthllizerModule ]);
```
or
```ts
let appModule = angular.module('myApp',[ 'authllizer' ]);
```

## Config
```ts
    import { IAuthllizerOptions } from '@authllizer/core';
    import { AuthProvider } from '@authllizer/ng';

    appModule.config(['$authProvider', ($authProvider: AuthProvider)=>{
        $authProvider.config({
            // ...
        } as IAuthllizerOptions);
    });
```
*Note: Authllizer auto config to use $http as [HttpClient](https://github.com/yisraelx/authllizer/blob/master/packages/@authllizer/core/docs/http.md). authllizer required global es6 `Promise`, You can use AngularJs `$q` service (`$window.Promise = $q;`)* 

## Use
```ts
    import { Authllizer } from '@authllizer/core';

    class SomeController{
        
        static $inject: string[] = ['$auth'];

        private $auth: Authllizer;

        constructor($auth: Authllizer){
            this.$auth = $auth;
        }
    }

    appModule.component('SomeComponent', { controller: SomeController, ... });
```
anther
```ts
    import { Authllizer } from '@authllizer/core';

    appModule.controller('SomeController', [ '$auth', function($auth: Authllizer) {

    }]);
```

### Interceptor
```ts
    import { IHttpProvider } from 'angular';

    appModule.config(['$httpProvider', ($httpProvider: IHttpProvider)=>{
        $httpProvider.interceptors.push('tokenInterceptor');
    });
```

## License
Copyright © 2017 [Yisrael Eliav](https://github.com/yisraelx),
Licensed under the [MIT license](https://github.com/yisraelx/authllizer/blob/master/LICENSE).

[Authllizer]: https://www.npmjs.com/package/@authllizer/core
[AngularJs]: https://angularjs.org
