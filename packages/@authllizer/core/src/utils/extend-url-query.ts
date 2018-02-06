import stringifyQuery from './stringify-query';
import isObject from './is-object';
import extend from './extend';
import parseQuery from './parse-query';

export default function extendUrlQuery(url: string, params: { [key: string]: any }): string {
    if (!isObject(params) || !Object.keys(params).length) { return url; }
    let [path, query = ''] = url.split('?');
    let queryObject = parseQuery(query);
    extend(queryObject, params);
    query = stringifyQuery(queryObject, {encode: true, delimiter: '&'});
    return `${path}?${query}`;
}
