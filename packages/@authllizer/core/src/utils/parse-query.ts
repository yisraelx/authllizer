import forEach from './for-each';

export default function parseQuery(query: string = ''): { [key: string]: any } {

    let queryObject: { [key: string]: any } = {};
    let params: string[] = query.split('&');

    forEach(params, (param: string) => {
        if (param) {
            let pair: string[] = param.split('=');
            let key = decodeURIComponent(pair[0]);
            let value = pair[1] ? decodeURIComponent(pair[1]) : true;
            queryObject[key] = value;
        }
    });

    return queryObject;
}
