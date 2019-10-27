import { BaseDialog } from '../../src/dialogs/base';

describe('BaseDialog', () => {
    describe('static parseUrl()', () => {
        it('should throw error if no params', () => {
            expect(() => {
                BaseDialog.parseUrl('https://example.com');
            }).toThrow(new Error(
                'OAuth redirect has occurred but no query or hash parameters were found. ' +
                'They were either not set during the redirect, or were removed—typically by a ' +
                'routing library—before Authllizer could read it.'
            ));
        });
        it('should return promise resolve with the data', () => {
            let data = BaseDialog.parseUrl('https://example.com?foo=bar#color=red');
            expect(data).toEqual({ foo: 'bar', color: 'red' });
        });
    });

    describe('new', () => {
        it('should create new base dialog', () => {
            let base = new (BaseDialog as any)('test', 'http://example.com', { foo: 'bar' });
            expect(base.name).toBe('test');
            expect(base.redirectUri).toBe('http://example.com');
            expect(base.displayOptions).toEqual({ foo: 'bar' });
        });
    });

    describe('setDisplayOptions', () => {
        it('should be set display options', () => {
            let base = new (BaseDialog as any)('', '', { foo: 'bar', color: 'red' });
            base.setDisplayOptions({ color: 'blue' });
            expect(base.displayOptions).toEqual({ foo: 'bar', color: 'blue' });
        });
    });

});
