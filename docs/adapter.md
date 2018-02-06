# Adapter
The Adapter is the component that bridges the Authllizer to api on your server side or your authentication service


You can use the Authllizer BackendAdapter (most cases of use)
```ts
import { Authllizer, BackendAdapter } from '@authllizer/core';

new Authllizer({
    adapter: BackendAdapter,  // the default is BackendAdapter
    // ...
});
```
With options
```ts
import { Authllizer, BackendAdapter, IBackendAdapterOptions } from '@authllizer/core';

new Authllizer({
    adapter: BackendAdapter.extend({
        baseUrl: 'https://example.com/auth', // the default is '/auth'
        tokenPath: 'data.token', // the default is 'access_token' - { "access_token": "***" }
        // ...
    } as IBackendAdapterOptions),
    // ...
});
```
or
```ts
import { Authllizer, BackendAdapter, IBackendAdapterOptions } from '@authllizer/core';

export interface ISomeServiceAdapterOptions extends IBackendAdapterOptions{
    apiKey?: string;
}

export class SomeServiceAdapter extends LocalAdapter{

    static extend: (options: ISomeServiceAdapterOptions) => typeof SomeServiceAdapter;

    baseUrl = 'https://someservice.com';
    signIn = '/login';
    signOut = {
        url: '/logout'
        httpOptions: { 
            params: {foo: 'bar'}
        }
    };

    set apiKey(apiKey: string){
        this.defaultRequestOptions.params.apiKey = apiKey;
    }

}
```
or you can create an adapter according to your needs
```ts
import { IAdapter } from '@authllizer/core';

export class SomeServiceAdapter implements IAdapter{
    // ...
}
```

If you created Adapter for an service (authentication, dbs, etc.), then you might want to publish it to npm, so that other users can easily connect to this service.

Recommended settings on publishing to npm:
```json
// package.json
{
    "name": "authllizer-< service name >-adapter", // authllizer-some-adapter
    "keywords": [ "authllizer", "authllizer-adapter"]
}
```
