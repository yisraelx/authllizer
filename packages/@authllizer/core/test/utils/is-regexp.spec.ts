
import isRegexp from '../../src/utils/is-regexp';

describe('isRegexp()', () => {

    it('should return true for regexp value', () => {
        expect(isRegexp(/^$/)).toBeTruthy();
    });

    it('should return false for not regexp value', () => {
        expect(isRegexp('string')).toBeFalsy();
    });
});
