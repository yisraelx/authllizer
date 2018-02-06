# Vue Authllizer Plugin
[![Source Code](https://img.shields.io/badge/%3C/%3E-source--code-blue.svg)](https://github.com/yisraelx/authllizer/blob/master/packages/@authllizer/vue)
[![Version](https://img.shields.io/npm/v/@authllizer/vue.svg)](https://www.npmjs.com/package/@authllizer/vue)
[![MIT License](https://img.shields.io/npm/l/@authllizer/vue.svg)](https://github.com/yisraelx/authllizer/blob/master/LICENSE)

**This plugin is a wrapper of [Authllizer] for comfortable using it in [VueJs].**

## Example
There are VueJs example project in the [source code](https://github.com/yisraelx/authllizer/blob/master/examples/vue).

## Install
```sh
$ npm install --save @authllizer/vue
# and install peer dependencies 
$ npm install --save @authllizer/core
```

## Setup
```ts
    import Vue from 'vue';
    import { default as VueAuthllizer } from '@authllizer/vue';
    import { IAuthllizerOptions } from '@authllizer/core';

    Vue.use(VueAuthllizer, {
        // ...
    } as IAuthllizerOptions);
```

## Use
```ts
    import Vue from 'vue';
    import { Authllizer } from '@authllizer/core';

    class SomeComponent extends Vue {
        doSomething(){
            let auth: Authllizer = this.$auth;
        }
    }
```

## Http Client
*You can use another library as http client see in the doc [HttpClient](https://github.com/yisraelx/authllizer/blob/master/packages/@authllizer/core/docs/http.md).*

### vue-axios
```ts
    import Vue from 'vue';
    import { IAuthllizerOptions } from '@authllizer/core';
    import VueAuthllizer, {  VueAxiosHttpClient } from '@authllizer/vue';
    import axios from 'axios';
    import * as VueAxios from 'vue-axios';

    Vue.use(VueAxios, axios);
    Vue.use(VueAuthllizer, {
        httpClient: new VueAxiosHttpClient
        // ...
    } as IAuthllizerOptions)
```
**interceptor**
```ts
    import { VueAxiosTokenInterceptor } from '@authllizer/vue';
    import Vue from 'vue';

    Vue.axios.interceptors.request.use(VueAxiosTokenInterceptor);
```

### vue-resource
```ts
    import Vue from 'vue';
    import { IAuthllizerOptions } from '@authllizer/core';
    import VueAuthllizer from '@authllizer/vue';
    import * as VueResource from 'vue-resource';
    
    Vue.use(VueResource);
    Vue.use(VueAuthllizer, {...} as IAuthllizerOptions);
```
**interceptor**
```ts
    import { VueResourceTokenInterceptor } from '@authllizer/vue';
    import Vue from 'vue';
    Vue.resource.interceptors.push(VueResourceTokenInterceptor);
```

## License
Copyright © 2017 [Yisrael Eliav](https://github.com/yisraelx),
Licensed under the [MIT license](https://github.com/yisraelx/authllizer/blob/master/LICENSE).

[Authllizer]: https://www.npmjs.com/package/@authllizer/core
[VueJs]: https://vuejs.org
