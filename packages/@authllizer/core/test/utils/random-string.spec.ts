import randomString from '../../src/utils/random-string';

describe('randomString()', () => {
    it('should be alphanumeric', () => {
        let str = randomString();
        expect(str).toMatch(/^[a-z0-9]*$/);
    });
});
