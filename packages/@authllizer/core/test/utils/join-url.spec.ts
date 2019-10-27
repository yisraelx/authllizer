import joinUrl from '../../src/utils/join-url';

describe('joinUrl()', () => {

    it('should return the url if he already has prefix', () => {
        let baseUrl = 'http://localhost:3000';
        let urlPath = 'http://exemple.com:3000/auth/facebook';
        expect(joinUrl(baseUrl, urlPath)).toEqual('http://exemple.com:3000/auth/facebook');
    });

    it('should merge baseUrl with relative url', () => {
        let baseUrl = 'http://localhost:3000';
        let urlPath = '/auth/facebook';
        expect(joinUrl(baseUrl, urlPath)).toEqual('http://localhost:3000/auth/facebook');
    });

});
