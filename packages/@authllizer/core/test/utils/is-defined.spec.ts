import isDefined from '../../src/utils/is-string';

describe('isDefined()', () => {

    it('should return true for defined value', () => {
        expect(isDefined('foo')).toBeTruthy();
    });

    it('should return false for not defined value', () => {
        expect(isDefined(void 0)).toBeFalsy();
        expect(isDefined(null)).toBeFalsy();
    });
});
