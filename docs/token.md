# Token
The token is a component that interfaces the identity, it interfaces your identity method to Authllizer.

```ts
import { Authllizer, JWT } from '@authllizer/core';

new Authllizer({
    token: JWT, // the default is JWT
    // ...
});
```

or you can create an token according to your identity method and your needs
```ts
import { IToken } from '@authllizer/core';

export class SomeToken implements IToken{
    // ...
}
```
If you've created an interface for a known identity method, , then you might want to publish it to npm, so that other users can easily use this identity method.
Recommended settings on publishing to npm:
```json
// package.json
{
    "name": "authllizer-< token type >-token", // authllizer-some-token
    "keywords": [ "authllizer", "authllizer-token"]
}
```