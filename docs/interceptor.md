
config interceptList
```ts
import { Authllizer, IConfigOptions } from '@authllizer/core';

Authllizer.instance.config({
    interceptList: [ 'http://example.com' ] // the default is [] (all)
    //...
} as IConfigOptions)
```

Example of creating a Interceptor for Axios
```ts
import axios, { AxiosRequestConfig } from 'axios';
import authllizer, { Authllizer, IToken } from '@authllizer/core';

export function AxiosTokenInterceptor(config: AxiosRequestConfig): AxiosRequestConfig {

    let { url, headers } = config;
    
    if (!headers['Authorization'] && authllizer.toIntercept(url)) {
        let token: IToken = authllizer.getToken();
        headers['Authorization'] = token.toHeader();
    }

    return config;
}

axios.interceptors.request.use(AxiosTokenInterceptor);
```
