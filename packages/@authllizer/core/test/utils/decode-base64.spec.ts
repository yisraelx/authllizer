import decodeBase64 from '../../src/utils/decode-base64';

describe('decodeBase64()', () => {

    it('should decode base64 string', () => {
        expect(decodeBase64('eyAiY29sb3IiOiAicmVkIiB9')).toBe('{ "color": "red" }');
    });

});
