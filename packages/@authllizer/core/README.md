# Authllizer
[![Source Code](https://img.shields.io/badge/%3C/%3E-source--code-blue.svg)](https://github.com/yisraelx/authllizer/blob/master/packages/@authllizer/core)
[![Version](https://img.shields.io/npm/v/@authllizer/core.svg)](https://www.npmjs.com/package/@authllizer/core)
[![MIT License](https://img.shields.io/npm/l/@authllizer/core.svg)](https://github.com/yisraelx/authllizer/blob/master/LICENSE)

### Authllizer is a authentication framework for the client-side of javascript applications, written in typescript.

## Examples
There are example projects in the [source code](https://github.com/yisraelx/authllizer/blob/master/examples).

## Install
```sh
$ npm install --save @authllizer/core
```

## Use
**class instance**
```ts
import authllizer, { IConfigOptions } from '@authllizer/core';
authllizer.config({...} as IConfigOptions);
```
```ts
import { default as authllizer, Authllizer, IConfigOptions } from '@authllizer/core';
authllizer === Authllizer.instance; // => true
```
**and also (like singleton)**
```ts
import {Authllizer} from '@authllizer/core';
new Authllizer === Authllizer.instance; // => true
```
**to create a new authllizer instance**
```ts
import { Authllizer, IAuthllizerOptions } from '@authllizer/core';

let authllizer: Authllizer = new Authllizer({
    useClassInstance: false // by default it true and acting like a singleton
// ...
} as IAuthllizerOptions);
```

**config**
```ts
import authllizer, { IConfigOptions, BackendAdapter, BrowserDialog, FetchHttpClient, OAuth2Provider, LocalStorage, JWT } from '@authllizer/core';
authllizer.config({
    adapter: BackendAdapter.extend({
        baseUrl: 'https://example.com/auth',
        signIn: '/login',
        signOut: {
            url: '/logout',
            httpOptions: {
                params: {foo: 'bar'}
            }
        }
    }),
    dialog: BrowserDialog, // this is the default
    httpClient: new FetchHttpClient(), // this is the default
    interceptList: ['https://example.com'],
    providers: {
        some: OAuth2Provider.extend({
            name: 'some',
            clientId: '***'
            //...
        }
    },
    storage: new LocalStorage(), // this is the default
    token: JWT // this is the default
} as IConfigOptions);
```

## Docs
* [Authllizer]
* [Adapter]
* [Dialog]
* [HttpClient]
* [Interceptor]
* [Provider]
* [Storage]
* [Token]

## Compatibility
This library are written in typescript and available in ES5 and ES6 standard.

#### Promise
This library requires ES6 Promise (native or polyfill) by default it uses the global "Promise".

#### fetch
By default [HttpClient] is FetchHttpClient and by default it uses the global "fetch" (native or polyfill).
if you want to define specific fetch library then:
```ts
import { Authllizer, FetchHttpClient, } from '@authllizer/core';
import fetch from 'library';

let authllizer: Authllizer = new Authllizer({
    httpClient: new FetchHttpClient(fetch),
    // ...
});
```
*Note: You can use another library as http client see in the doc [HttpClient].*

## Credits
This library is based on AngularJs [Satellizer](https://github.com/sahat/satellizer) library developed by [Sahat Yalkabov](https://github.com/sahat).

## License
Copyright © 2017 [Yisrael Eliav](https://github.com/yisraelx),
Licensed under the [MIT license](https://github.com/yisraelx/authllizer/blob/master/LICENSE).

[Authllizer]: https://github.com/yisraelx/authllizer/blob/master/docs/authllizer.md
[Adapter]: https://github.com/yisraelx/authllizer/blob/master/docs/adapter.md
[Dialog]: https://github.com/yisraelx/authllizer/blob/master/docs/dialog.md
[HttpClient]: https://github.com/yisraelx/authllizer/blob/master/docs/http.md
[Interceptor]: https://github.com/yisraelx/authllizer/blob/master/docs/interceptor.md
[Provider]: https://github.com/yisraelx/authllizer/blob/master/docs/provider.md
[Storage]: https://github.com/yisraelx/authllizer/blob/master/docs/storage.md
[Token]: https://github.com/yisraelx/authllizer/blob/master/docs/token.md
