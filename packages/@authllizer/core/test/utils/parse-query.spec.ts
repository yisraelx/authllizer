
import parseQuery from '../../src/utils/parse-query';

describe('parseQuery()', () => {

    it('should parse a query string', () => {
        let querystring = 'hello=world&foo=bar';
        expect(parseQuery(querystring)).toEqual({ hello: 'world', foo: 'bar' });
    });

    it('should parse a empty query to empty object', () => {
        expect(parseQuery()).toEqual({});
    });

    it('should set a empty and single property to true', () => {
        expect(parseQuery('foo')).toEqual({ foo: true });
    });

});
