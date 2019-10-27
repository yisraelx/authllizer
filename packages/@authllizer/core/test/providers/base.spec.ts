import { BaseProvider } from '../../src/providers/base';

describe('BaseProvider', () => {
    describe('static extend()', () => {
        it('should create new class that extends from BaseProvider', () => {
            let SomeProvider = BaseProvider.extend({
                name: 'some',
                foo: 'bar',
                color: 'blue'
            }).extend({
                color: 'red'
            });
            let someProvider = new (SomeProvider as any)({}, () => {
            });
            expect(someProvider instanceof BaseProvider).toBeTruthy();
            expect(someProvider.name).toBe('some');
            expect(someProvider.foo).toBe('bar');
            expect(someProvider.color).toBe('red');
        });

        it('should extend after es6 extend', () => {
            class AProvider extends (BaseProvider as any) {
                name = 'a';
                color = 'blue';
            }

            let BProvider = AProvider.extend({
                name: 'b',
                color: 'red'
            });
            let bProvider = new (BProvider as any)({}, () => {
            });
            expect(bProvider instanceof BaseProvider).toBeTruthy();
            expect(bProvider.name).toBe('b');
            expect(bProvider.color).toBe('red');
        });
    });

    describe('extends', () => {
        it('should es6 extends class', () => {
            class SomeProvider extends (BaseProvider as any) {
                name = 'some';
                foo = 'bar';
            }

            let someProvider = new (SomeProvider as any)({}, () => {
            });
            expect(someProvider.name).toBe('some');
            expect(someProvider.foo).toBe('bar');
        });
    });

    describe('new ()', () => {
        it('should create new provider object', () => {
            let base = new (BaseProvider as any)('adapter', 'dialog');
            expect(base._adapter).toBe('adapter');
            expect(base._dialog).toBe('dialog');
        });
    });

    describe('openDialog()', () => {
        it('should open new dialog', () => {
            let providerConfig = {
                name: 'foo',
                redirectUri: 'https://example.com',
                displayOptions: { foo: 'bar' }
            };
            let FooProvider = BaseProvider.extend(providerConfig);

            function mockDialog(name, redirectUri, displayOptions) {
                expect(name).toBe(providerConfig.name);
                expect(redirectUri).toBe(providerConfig.redirectUri);
                expect(displayOptions).toEqual(providerConfig.displayOptions);
                return {
                    async open(url) {
                        expect(url).toBe('https://test.com');
                        return 'data';
                    }
                };
            }

            let fooProvider = new (FooProvider as any)('', mockDialog);
            return fooProvider.openDialog('https://test.com').then((data) => {
                expect(data).toBe('data');
            });

        });
    });

    describe('checkDialogResponse()', () => {
        it('should throw error if error param', () => {
            let params = {
                error: 'Some Error!'
            };
            expect(() => {
                (BaseProvider.prototype as any).checkDialogResponse(params);
            }).toThrow(new Error('Some Error!'));
        });
    });
});
