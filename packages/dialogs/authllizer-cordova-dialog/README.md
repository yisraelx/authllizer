# Authllizer Cordova Dialog
[![Source Code](https://img.shields.io/badge/%3C/%3E-source--code-blue.svg)](https://github.com/yisraelx/authllizer/blob/master/packages/dialogs/authllizer-cordova-dialog)
[![Version](https://img.shields.io/npm/v/authllizer-cordova-dialog.svg)](https://www.npmjs.com/package/authllizer-cordova-dialog)
[![MIT License](https://img.shields.io/npm/l/authllizer-cordova-dialog.svg?color=yellow)](https://github.com/yisraelx/authllizer/blob/master/LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/min/authllizer-cordova-dialog.svg?color=green)](https://bundlephobia.com/result?p=authllizer-cordova-dialog)
[![TypeScript](https://img.shields.io/badge/100%25-TypeScript-blue.svg)](https://www.typescriptlang.org)

## Install
```sh
$ npm install --save authllizer-cordova-dialog
# and add cordova plugin
$ cordova plugin add cordova-plugin-inappbrowser
# and install peer dependencies 
$ npm install --save @authllizer/core
```

## Use
```ts
import { Authllizer, IAuthllizerOptions } from '@authllizer/core';
import CordovaDialog, { ICordovaDialogOptions } from 'authllizer-cordova-dialog';

let authllizer: Authllizer = new Authllizer({
    dialog: CordovaDialog.extend({
        // ...
    } as ICordovaDialogOptions),
    // ...
} as IAuthllizerOptions);
```
Support both cordova and browser
```ts
import { Authllizer, IAuthllizerOptions, BrowserDialog } from '@authllizer/core';
import CordovaDialog, { isCordova } from 'authllizer-cordova-dialog';

let authllizer: Authllizer = new Authllizer({
    dialog: isCordova() ? CordovaDialog : BrowserDialog,
    // ...
} as IAuthllizerOptions);
```
You must set the provider 'redirectUri' to the address you set as redirect uri in the provider settings
```ts
import { Authllizer, OAuth1Provider, OAuth2Provider, IAuthllizerOptions } from '@authllizer/core';

let authllizer: Authllizer = new Authllizer({
    providers:{
        some1: OAuth1Provider.extend({
            redirectUri: '***',
            // ...
        }),
        some2: OAuth2Provider.extend({
            redirectUri: '***',
            // ...
        }),
        // ...
    }
    // ...
} as IAuthllizerOptions);
```

## License
Copyright © 2017 [Yisrael Eliav](https://github.com/yisraelx),
Licensed under the [MIT license](https://github.com/yisraelx/authllizer/blob/master/LICENSE).
