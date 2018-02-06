

import isDefined from './is-defined';

export default function get<T>(object: { [key: string]: any }, path?: string, defaultValue?: T) {
    if (!isDefined(path) || path === '') { return object; }
    let keys = `${path}`.split('.');
    let {length} = keys;
    let result = object;
    for (let i = 0; i < length; i++) {
        let key = keys[i];
        try {
            result = result[key];
        } catch (e) {
            return defaultValue;
        }
    }
    return (result !== void 0 ? result :  defaultValue) as T | any;
}
