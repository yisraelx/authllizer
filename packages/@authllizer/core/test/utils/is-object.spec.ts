import isObject from '../../src/utils/is-object';

describe('isObject()', () => {

    it('should return true for object value', () => {
        expect(isObject({})).toBeTruthy();
    });

    it('should return false for not object value', () => {
        expect(isObject('foo')).toBeFalsy();
    });
});
