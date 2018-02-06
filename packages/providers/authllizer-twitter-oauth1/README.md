# Authllizer Twitter oauth1 Provider
[![Source Code](https://img.shields.io/badge/%3C/%3E-source--code-blue.svg)](https://github.com/yisraelx/authllizer/blob/master/packages/providers/authllizer-twitter-oauth1)
[![Version](https://img.shields.io/npm/v/authllizer-twitter-oauth1.svg)](https://www.npmjs.com/package/authllizer-twitter-oauth1)
[![MIT License](https://img.shields.io/npm/l/authllizer-twitter-oauth1.svg)](https://github.com/yisraelx/authllizer/blob/master/LICENSE)

## Install
```sh
$ npm install --save authllizer-twitter-oauth1
# and install peer dependencies 
$ npm install --save @authllizer/core
```

## Use
```ts
import { Authllizer, IAuthllizerOptions } from '@authllizer/core';
import TwitterOAuth1, { ITwitterOAuth1Options } from 'authllizer--twitter-oauth1';

let authllizer: Authllizer = new Authllizer({
    providers: {
        twitter: TwitterOAuth1.extend({
            // ...
        } as ITwitterOAuth1Options),
        // ...
    },
    // ...
} as IAuthllizerOptions);
```

## License
Copyright © 2017 [Yisrael Eliav](https://github.com/yisraelx),
Licensed under the [MIT license](https://github.com/yisraelx/authllizer/blob/master/LICENSE).
