
import isString from '../../src/utils/is-string';

describe('isString()', () => {

    it('should return true for string value', () => {
        expect(isString('foo')).toBeTruthy();
    });

    it('should return false for not string value', () => {
        expect(isString(1)).toBeFalsy();
    });
});
