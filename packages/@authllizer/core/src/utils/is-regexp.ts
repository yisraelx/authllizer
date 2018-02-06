import isObject from './is-object';

export default function isRegExp(value: any) {
    return isObject(value) && value instanceof RegExp;
}
