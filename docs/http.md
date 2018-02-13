# http
```ts
import { Authllizer, FetchHttpClient } from '@authllizer/core';
new Authllizer({
    httpClient: new FetchHttpClient(), // this is the default
    // ...
});
```
*Note: It requires global "fetch" and is not supported by older browsers, if you need support for older browsers then you can be use "fetch-polyfill".*

Example of creating a http client adapter for Axios
```ts
import axios, { AxiosRequestConfig } from 'axios';
import authllizer, { Authllizer, IConfigOptions, IHttpClient, IHttpRequestOptions, IHttp } from '@authllizer/core';

export class AxiosHttpClient implements IHttpClient{

    public request<T>(url: string, config: IHttpRequestOptions): Promise<T> {
    
        (config as AxiosRequestConfig).url = url;
        
        return axios(config as AxiosRequestConfig).then((response: AxiosResponse<T>) => response.data);
    }
    
}

authllizer.config({
    httpClient: new AxiosHttpClient(),
    // ...
} as IConfigOptions);

```
or you can create an http client according to your http client library
```ts
import { Authllizer, IHttpClient } from '@authllizer/core';

export class SomeHttpClient implements IHttpClient{
    // ...
}
```
Then you might want to publish it to npm, so that other users can easily use this http client library with authllizer.

Recommended settings on publishing to npm:
```json
// package.json
{
    "name": "authllizer-< http client name >-http", // authllizer-axios-http
    "keywords": [ "authllizer", "authllizer-http"]
}
```
