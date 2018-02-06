
import isFunction from '../../src/utils/is-function';

describe('isFunction()', () => {

    it('should return true for function value', () => {
        expect(isFunction(() => {})).toBeTruthy();
    });

    it('should return false for not function value', () => {
        expect(isFunction('foo')).toBeFalsy();
    });
});
