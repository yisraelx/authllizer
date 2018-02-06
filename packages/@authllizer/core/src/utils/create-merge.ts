import isObject from './is-object';

export default function createMerge(level: number = Infinity) {
    return (target: { [key: string]: any } = {}, ...sources: { [key: string]: any }[]): { [key: string]: any } => {
        let {length: sourcesLength} = sources;
        for (let i = 0; i < sourcesLength; i++) {
            let source = sources[i] || {};
            let keys = Object.keys(source);
            let {length: keysLength} = keys;
            for (let j = 0; j < keysLength; j++) {
                let key = keys[j];
                let value = source[key];
                if (level && isObject(value) && !Array.isArray(value) && isObject(target[key]) && !Array.isArray(target[key])) {
                    value = createMerge(--level)({}, target[key], value);
                }
                target[key] = value;
            }
        }
        return target;
    };
}
