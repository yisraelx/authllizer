
import extendUrlQuery from '../../src/utils/extend-url-query';

describe('extendUrlQuery()', () => {

    it('should return the url without change if no params to add', () => {
        let url = 'https://test.com';
        let params = {};
        let extendUrl = extendUrlQuery(url, params);
        expect(extendUrl).toBe(url);
    });

    it('should override url params', () => {
        let url = 'https://test.com?color=red';
        let params = {
            color: 'blue'
        };
        let extendUrl = extendUrlQuery(url, params);
        expect(extendUrl).toBe('https://test.com?color=blue');
    });

    it('should add params to exesits url params', () => {
        let url = 'https://test.com?color=red';
        let params = {
            foo: 'bar',
            name: 'bob'
        };
        let extendUrl = extendUrlQuery(url, params);
        expect(extendUrl).toBe('https://test.com?color=red&foo=bar&name=bob');
    });
});
