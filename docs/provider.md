# Provider
```ts
import authllizer from '@authllizer/core';
import FacebookOAuth2 from 'authllizer-facebook-oauth2';
import TwitterOAuth1 from 'authllizer-twitter-oauth1';
import GoogleOAuth2 from 'authllizer-google-oauth2';

authllizer.config({
    providers: { 
        facebook: FacebookOAuth2.extend({
            clientId: '...',
            // ...
        }),
        twit: TwitterOAuth1
    },
    // ...
});

// then
authllizer.authenticate('twit');
authllizer.authenticate('facebook', {foo: 'bar'});
```

```ts
import { Authllizer, OAuth2Provider, OAuth1Provider } from '@authllizer/core';

export class MyProvider extends OAuth2Provider{
    // ...
}
new Authllizer({
    providers: { 
        my: MyProvider,
        some: OAuth1Provider.extend({
            // ...
        })
    },
    // ...
});
```

```ts
import { Authllizer, OAuth1Provider, OAuth2Provider } from '@authllizer/core';

export class SomeOAuth1 extends OAuth1Provider{
    name = 'some';
    authorizationEndpoint = 'https://some.com/authoriz';
    // ...
}

new Authllizer({
    providers: { 
        foo: SomeProvider,
        example: OAuth2Provider.extend({
            authorizationEndpoint: 'https://example.com/auth',
            clientId: '***',
            // ...
        })
    },
    // ...
});
```
or you can create an provider according to your needs
```ts
import { Authllizer, IProvider } from '@authllizer/core';

export class SomeProvider implements IProvider{
    // ...
}
```
Then you might want to publish it to npm, so that other users can easily authentication with this provider.

Recommended settings on publishing to npm:
```json
// package.json
{
    "name": "authllizer-< provider name >-< method name >", // authllizer-some-oauth2
    "keywords": [ "authllizer", "authllizer-provider", "authllizer-< method name >"] // authllizer-oauth2
}
```