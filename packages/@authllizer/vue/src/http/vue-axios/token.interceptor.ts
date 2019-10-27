import Vue from 'vue';

export function VueAxiosTokenInterceptor(config) {
    let { url, headers } = config;

    if (!headers['Authorization'] && Vue.authllizer.toIntercept(url)) {
        headers['Authorization'] = Vue.authllizer.getToken().toHeader();
    }

    return config;
}
