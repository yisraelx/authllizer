import Vue from 'vue';

export function VueResourceTokenInterceptor(request, next) {

    let {url, headers} = request;

    if (!headers['Authorization'] && Vue.authllizer.toIntercept(url)) {
        headers['Authorization'] = Vue.authllizer.getToken().toHeader();
    }

    next();

}
