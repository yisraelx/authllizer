# Authllizer Electron Dialog
[![Source Code](https://img.shields.io/badge/%3C/%3E-source--code-blue.svg)](https://github.com/yisraelx/authllizer/blob/master/packages/dialogs/authllizer-electron-dialog)
[![Version](https://img.shields.io/npm/v/authllizer-electron-dialog.svg)](https://www.npmjs.com/package/authllizer-electron-dialog)
[![MIT License](https://img.shields.io/npm/l/authllizer-electron-dialog.svg)](https://github.com/yisraelx/authllizer/blob/master/LICENSE)

## Install
```sh
$ npm install --save authllizer-electron-dialog
# and install peer dependencies 
$ npm install --save @authllizer/core
```

## Use
```ts
import { Authllizer, IAuthllizerOptions } from '@authllizer/core';
import ElectronDialog, { IElectronDialogOptions } from 'authllizer-electron-dialog';

let authllizer: Authllizer = new Authllizer({
    dialog: ElectronDialog.extend({
        // ...
    } as IElectronDialogOptions),
    // ...
} as IAuthllizerOptions);
```
Support both electron and browser
```ts
import { Authllizer, IAuthllizerOptions, BrowserDialog } from '@authllizer/core';
import ElectronDialog, { isElectron } from 'authllizer-electron-dialog';

let authllizer: Authllizer = new Authllizer({
    dialog: isElectron() ? ElectronDialog : BrowserDialog,
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
