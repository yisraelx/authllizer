# Dialog
The Dialog is a component that interfaces the dialogue process between the platform and Authllizer (relevant: for authentication methods that require dialogue with the user)

```ts
import { Authllizer, BrowserDialog } from '@authllizer/core';

new Authllizer({
    dialog: BrowserDialog, // the default is BrowserDialog
    // ...
});
```

Support for multiple platform
```ts
import { Authllizer, BrowserDialog } from '@authllizer/core';
import CordovaDialog, { isCordova } from 'authllizer-cordova-dialog';

new Authllizer({
    dialog: isCordova() ? CordovaDialog : BrowserDialog,
    // ...
});
```

or you can create an dialog according to your platform and your needs
```ts
import { IDialog } from '@authllizer/core';

export class SomePlatformDialog implements IDialog{
    // ...
}
```

Recommended settings on publishing to npm:
```json
// package.json
{
    "name": "authllizer-< platform name >-dialog", // authllizer-some-dialog
    "keywords": [ "authllizer", "authllizer-dialog"]
}
```
