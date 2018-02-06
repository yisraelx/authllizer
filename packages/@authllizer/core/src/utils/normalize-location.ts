import isString from './is-string';

export default function normalizeLocation(location: Location | HTMLAnchorElement | any, { path, data }: { path?: boolean, data?: boolean } = {}) {
    if (isString(location)) {
        let parser = document.createElement('a');
        parser.href = location;
        location = parser;
    }

    let { protocol, hostname, port, pathname, search, hash } = location;
    let isHttps = protocol === 'https:';
    port = port || (isHttps ? '443' : '80');
    pathname = pathname[0] === '/' ? pathname : `/${pathname}`;
    return [
        `${protocol}//${hostname}:${port}`,
        path ? pathname : '',
        data ? (search + hash) : '',
    ].join('');
}
