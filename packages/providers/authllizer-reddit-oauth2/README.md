# Authllizer Reddit OAuth2 Provider
[![Source Code](https://img.shields.io/badge/%3C/%3E-source--code-blue.svg)](https://github.com/yisraelx/authllizer/blob/master/packages/providers/authllizer-reddit-oauth2)
[![Version](https://img.shields.io/npm/v/authllizer-reddit-oauth2.svg)](https://www.npmjs.com/package/authllizer-reddit-oauth2)
[![MIT License](https://img.shields.io/npm/l/authllizer-reddit-oauth2.svg)](https://github.com/yisraelx/authllizer/blob/master/LICENSE)

## Install
```sh
$ npm install --save authllizer-reddit-oauth2
# and install peer dependencies 
$ npm install --save @authllizer/core
```

## Use
```ts
import { Authllizer, IAuthllizerOptions } from '@authllizer/core';
import RedditOAuth2, { IRedditOAuth2Options } from 'authllizer-reddit-oauth2';

let authllizer: Authllizer = new Authllizer({
    providers: {
        reddit: RedditOAuth2.extend({
            clientId: '***',
            // ...
        } as IRedditOAuth2Options),
        // ...
    },
    // ...
} as IAuthllizerOptions);
```

## License
Copyright © 2017 [Yisrael Eliav](https://github.com/yisraelx),
Licensed under the [MIT license](https://github.com/yisraelx/authllizer/blob/master/LICENSE).