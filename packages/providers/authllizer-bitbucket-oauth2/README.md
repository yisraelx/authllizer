# Authllizer Bitbucket OAuth2 Provider
[![Source Code](https://img.shields.io/badge/%3C/%3E-source--code-blue.svg)](https://github.com/yisraelx/authllizer/blob/master/packages/providers/authllizer-bitbucket-oauth2)
[![Version](https://img.shields.io/npm/v/authllizer-bitbucket-oauth2.svg)](https://www.npmjs.com/package/authllizer-bitbucket-oauth2)
[![MIT License](https://img.shields.io/npm/l/authllizer-bitbucket-oauth2.svg)](https://github.com/yisraelx/authllizer/blob/master/LICENSE)

## Install
```sh
$ npm install --save authllizer-bitbucket-oauth2
# and install peer dependencies 
$ npm install --save @authllizer/core
```

## Use
```ts
import { Authllizer, IAuthllizerOptions } from '@authllizer/core';
import BitbucketOAuth2, { IBitbucketOAuth2Options } from 'authllizer-bitbucket-oauth2';

let authllizer: Authllizer = new Authllizer({
    providers: {
        bitbucket: BitbucketOAuth2.extend({
            clientId: '***',
            // ...
        } as IBitbucketOAuth2Options),
        // ...
    },
    // ...
} as IAuthllizerOptions);
```

## License
Copyright © 2017 [Yisrael Eliav](https://github.com/yisraelx),
Licensed under the [MIT license](https://github.com/yisraelx/authllizer/blob/master/LICENSE).
