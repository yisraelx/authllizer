import normalizeLocation from '../../src/utils/normalize-location';

describe('normalizeLocation()', () => {

    it('should be normalize url and return origin', () => {
        [
            ['http://test.com', 'http://test.com:80'],
            ['https://api.test.com', 'https://api.test.com:443'],
            ['https://test.com:3000/lala', 'https://test.com:3000'],
            ['http://test.com/?foo=bar', 'http://test.com:80'],
            ['http://api.test.com:5000?foo=bar#color=red', 'http://api.test.com:5000']
        ].forEach(([url, result]) => {
            let normalize = normalizeLocation(url);
            expect(normalize).toBe(result);
        });
    });

    it('should be normalize url and return origin and path', () => {
        [
            ['http://test.com:80', 'http://test.com:80/'],
            ['http://test.com:80/', 'http://test.com:80/'],
            ['https://api.test.com:80/foo', 'https://api.test.com:80/foo'],
            ['https://api.test.com', 'https://api.test.com:443/'],
            ['https://test.com:3000/color?', 'https://test.com:3000/color'],
            ['http://test.com?foo=bar', 'http://test.com:80/'],
            ['http://api.test.com:5000?foo=bar#color=red', 'http://api.test.com:5000/']
        ].forEach(([url, result]) => {
            let normalize = normalizeLocation(url, { path: true });
            expect(normalize).toBe(result);
        });
    });

    it('should be normalize url and return origin and data', () => {
        [
            ['http://test.com:80', 'http://test.com:80'],
            ['https://api.test.com:80?foo=bar', 'https://api.test.com:80?foo=bar'],
            ['https://api.test.com#color=red', 'https://api.test.com:443#color=red'],
            ['https://test.com:3000/color?', 'https://test.com:3000'],
            ['http://test.com?foo=bar', 'http://test.com:80?foo=bar'],
            ['http://test.com?foo=bar#color=red', 'http://test.com:80?foo=bar#color=red'],
            ['http://api.test.com:5000?foo=bar#color=red', 'http://api.test.com:5000?foo=bar#color=red']
        ].forEach(([url, result]) => {
            let normalize = normalizeLocation(url, { data: true });
            expect(normalize).toBe(result);
        });
    });

    it('should be normalize url and return origin and path and data', () => {
        [
            ['http://test.com:80', 'http://test.com:80/'],
            ['https://api.test.com:80/some?foo=bar', 'https://api.test.com:80/some?foo=bar'],
            ['https://test.com#color=red', 'https://test.com:443/#color=red'],
            ['https://test.com:3000/some?', 'https://test.com:3000/some'],
            ['http://test.com:3000/some?#color=red', 'http://test.com:3000/some#color=red'],
            ['http://test.com?foo=bar', 'http://test.com:80/?foo=bar'],
            ['http://test.com?foo=bar#color=red', 'http://test.com:80/?foo=bar#color=red'],
            ['http://api.test.com:5000?foo=bar#color=red', 'http://api.test.com:5000/?foo=bar#color=red']
        ].forEach(([url, result]) => {
            let normalize = normalizeLocation(url, { path: true, data: true });
            expect(normalize).toBe(result);
        });
    });

});
