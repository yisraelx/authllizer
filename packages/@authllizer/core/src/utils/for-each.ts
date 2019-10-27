export default function forEach(collection: any = [], iteratee: any = (v: any) => v) {
    let objectKeys = !Array.isArray(collection) && Object.keys(collection);
    let { length } = objectKeys ? objectKeys : collection;
    if (!length) {
        return collection;
    }
    let index: number = 0;
    while (index < length) {
        let key = objectKeys ? objectKeys[index++] : index++;
        let value = collection[key];
        iteratee(value, key, collection);
    }
    return collection;
}
