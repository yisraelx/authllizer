# Storage

```ts
import { Authllizer, LocalStorage, SessionStorage } from '@authllizer/core';

let authllizer: Authllizer = new Authllizer({
    storage: new LocalStorage(), // the default is LocalStorage
    // ...
});

// you can change it
authllizer.config({
    storage: new SessionStorage()
});
```

or you can create an storage according to your needs
```ts
import { Authllizer, IStorage } from '@authllizer/core';

export class SomeStorage implements IStorage{
    // ...
}
```