export default function joinUrl(baseUrl: string, url: string) {
    if (/^(?:[a-z]+:)?\/\//i.test(url)) {
        return url;
    }
    let joined = [baseUrl, url].join('/');
    let normalize = (str: string) => {
        return str
            .replace(/[\/]+/g, '/')
            .replace(/\/\?/g, '?')
            .replace(/\/\#/g, '#')
            .replace(/\:\//g, '://');
    };
    return normalize(joined);
}
