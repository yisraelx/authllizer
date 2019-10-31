# Angular X Authllizer Module
[![Source Code](https://img.shields.io/badge/%3C/%3E-source--code-blue.svg)](https://github.com/yisraelx/authllizer/blob/master/packages/@authllizer/ngx)
[![Version](https://img.shields.io/npm/v/@authllizer/ngx.svg)](https://www.npmjs.com/package/@authllizer/ngx)
[![MIT License](https://img.shields.io/npm/l/@authllizer/ngx.svg?color=yellow)](https://github.com/yisraelx/authllizer/blob/master/LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/min/@authllizer/ngx.svg?color=green)](https://bundlephobia.com/result?p=@authllizer/ngx)
[![TypeScript](https://img.shields.io/badge/100%25-TypeScript-blue.svg)](https://www.typescriptlang.org)

**This module is a wrapper of [Authllizer] for comfortable using it in [Angular X].**

## Example
There are Angular X example project in the [source code](https://github.com/yisraelx/authllizer/blob/master/examples/ngx).

## Install
```sh
$ npm install --save @authllizer/ngx
# and install peer dependencies 
$ npm install --save @authllizer/core
```

## Setup
```ts
    import { NgModule } from '@angular/core';
    import { default as AuthllizerModule, IAuthllizerOptions } from '@authllizer/ngx';

    @NgModule({
        providers: [
            AuthllizerModule.forRoot({
                // ...
            } as IAuthllizerOptions)
        ]
    })
    export class AppModule{}
```
*Note: Authllizer auto config to use Angular HttpClient as [HttpClient](https://github.com/yisraelx/authllizer/blob/master/packages/@authllizer/core/docs/http.md)* 
## Use
```ts
import { Component } from '@angular/core';
import { Authllizer } from '@authllizer/core';

@Component({...})
export class SomeComponent{

    private _auth: Authllizer;

    constructor(auth: Authllizer){
        this._auth = auth;
    }
}
```

### Interceptor
```ts
    import { NgModule } from '@angular/core';
    import { HTTP_INTERCEPTORS } from '@angular/common/http';
    import { TokenInterceptor } from '@authllizer/ngx';

    @NgModule({
        providers: [{
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }]
    })
    export class AppModule{}
```

## License
Copyright © 2017 [Yisrael Eliav](https://github.com/yisraelx),
Licensed under the [MIT license](https://github.com/yisraelx/authllizer/blob/master/LICENSE).

[Authllizer]: https://www.npmjs.com/package/@authllizer/core
[Angular X]: https://angular.io
