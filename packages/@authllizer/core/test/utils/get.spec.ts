
import get from '../../src/utils/get';

describe('get()', () => {

    it('should get deep property from object', () => {
        let response = {
            data: {
                foo: 'bar'
            }
        };
        expect(get(response, 'data.foo')).toBe('bar');
    });

    it('should return default value if the property is not exists', () => {
        expect(get({}, 'data.foo', 'bar')).toBe('bar');
    });

    it('should return the object if no path', () => {
        let object = {color: 'red'};
        expect(get(object)).toBe(object);
    });

    it('should return the default value if value id undefined', () => {
        let object = {foo: void 0};
        expect(get(object, 'foo', 'bar')).toBe('bar');
    });
});
