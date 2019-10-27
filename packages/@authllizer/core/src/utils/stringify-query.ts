import forEach from './for-each';

export default function stringifyQuery(object: {[key: string]: any}, { encode = false, delimiter = ',' } = {}): string {
    let parts: string[] = [];

    forEach(object, (value: string, key: string) => {
        if (encode) {
            key = encodeURIComponent(key);
            value = encodeURIComponent(value);
        }
        parts.push(`${ key }=${ value }`);
    });

    return parts.join(delimiter);
}
