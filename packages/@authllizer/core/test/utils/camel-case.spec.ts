import camelCase from '../../src/utils/camel-case';

describe('camelCase()', () => {

    it('should return camelized string', () => {
        expect(camelCase('redirect_uri')).toEqual('redirectUri');
    });

});
