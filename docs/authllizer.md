### SignIn()
```ts
// main.ts
import { default as authllizer, BackendAdapter } from '@authllizer/core';

authllizer.config({
    adapter: BackendAdapter.extend({
        baseUrl: '/api/auth',
        signIn: '/login'
    });
});

// login.ts
import authllizer from '@authllizer/core';

export interface IUserProfile {...}

export async function signIn(email: string, password: string){
    let profile: IUserProfile = await authllizer.signIn<IUserProfile>({
        email,
        password
    });
    // ...
}
```
```ts
import { Authllizer } from '@authllizer/core';

export interface ISignInUser{
    username: string;
    password: string;
} 

let user: ISignInUser = {
    username: 'bob',
    password: 'Pa$$w0rd'
};

Authllizer.instance.signIn(user).then(() => {
    // ...
}
```

### SignUp()
```ts
import authllizer from '@authllizer/core';

export interface IUser {...}
let user: IUser = {...};

authllizer.signUp(user, true).then((response) => {
    // ...
});
```

### SignOut()
```ts
import { Authllizer, BackendAdapter } from '@authllizer/core';

let authllizer: Authllizer = new Authllizer({
    adapter: BackendAdapter.extend({
        signOut: '/logout'
    });
});

authllizer.signOut<any>().then((response: any) => {
    // ...
});

```

### authenticate() & link()
```ts
import authllizer, { TwitterOAuth1 } from '@authllizer/core';

authllizer.config({
    providers: {
        twitter: TwitterOAuth1
    },
    // ...
});

authllizer.authenticate('twitter', { nickname: 'bob' }).then((response) => {
    // ...
});
```

```ts
import authllizer, { GoogleOAuth2 } from '@authllizer/core';

let MyGoogleOauth2 = GoogleOAuth2.extend({
    clientId: '***'
});

authllizer.config({
    providers: {
        'my-google': MyGoogleOauth2
    },
    // ...
});

export async function signInWithGoogle(data: { [key: string]: any }): Promise<any> {
     let response = await authllizer.authenticate('my-google', data);
     // ...
     return data;
}

signInWithGoogle({ foo: 'bar' }).then((response) => {
    // ...
});
```

### unlink()
```ts
import { Authllizer } from '@authllizer/core';
let authllizer: Authllizer = new Authllizer({
    adapter: BackendAdapter.extend({
        unlink: '/unlink'
    }),
    // ...
});

authllizer.unlink<any>('faceboobk').then((response: any) => {
    // ...
});
```

### refresh()
```ts
import { Authllizer }  from '@authllizer/core';

Authllizer.instance.refresh().then((response) => {
    // ...
});
```

### isAuthenticated()
```ts
import { Authllizer }  from '@authllizer/core';

let { instance } = Authllizer;
instance.isAuthenticated() === !!instance.getToken();
```

### getToken()
```ts
import authllizer, { JWT, IJWTPayload }  from '@authllizer/core';
authllizer.config({
    token: JWT // the default is JWT
    // ...
});
let token: JWT = authllizer.getToken<JWT>();
let payload: IJWTPayload = token.getPayload();
```

### setToken()
```ts
import authllizer, { Authllizer, IToken, JWT }  from '@authllizer/core';
let token: IToken = new JWT('***');
authllizer.setToken(token);
```
```ts
import { Authllizer, IToken, JWT }  from '@authllizer/core';
let token: string = '***';
Authllizer.instance.setToken(token);
```

### removeToken()
```ts
import authllizer  from '@authllizer/core';
authllizer.removeToken();
```

### toIntercept()
```ts
import { Authllizer }  from '@authllizer/core';

let authllizer: Authllizer = new Authllizer({
    interceptList: [
        'http://api.example.com', 
        /^https.*/
    ],
    // ...
});
authllizer.setToken('***');
authllizer.toIntercept('http://api.example.com/some?foo=bar'); // => true (origin)
authllizer.toIntercept('https://example.com?foo=bar'); // => true (regex)
authllizer.toIntercept('http://test.com/api'); // => false (no match)
authllizer.toIntercept('https://test.com/api'); // => true (regex)
authllizer.removeToken();
authllizer.toIntercept('http://api.example.com/some?foo=bar'); // => false (no authenticated user)
```

### onChange
```ts
import { Authllizer, EventEmitter }  from '@authllizer/core';
let instance: Authllizer = Authllizer.instance;
let onChange: EventEmitter<boolean> = instance.onChange;
let authChangeHandler = (isAuthenticated: boolean) => {
    // ...
};
onChange.on(authChangeHandler);
onChange.remove(authChangeHandler);
```
```ts
import authllizer from '@authllizer/core';
setInterval(() => {
    let token: IToken = authllizer.getToken();
    if(!token){
        authllizer.onChange.emit(false);
    }
}, 1000);
```
