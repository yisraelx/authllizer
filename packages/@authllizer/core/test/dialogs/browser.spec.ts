import { BrowserDialog } from '../../src/dialogs/browser';

describe('BrowserDialog', () => {

    describe('open()', () => {
        it('should create new dialog with the correct args and call focus and call resolve', () => {
            let focus = false;
            let parseUrl = false;
            let listen = false;

            let browserDialog = new BrowserDialog('test', 'https://test.com', { foo: 'bar' });
            spyOn(window, 'open').and.callFake((url, name, features) => {
                expect(url).toBe('https://example.com');
                expect(name).toBe('test');
                expect(features).toBe('top=107.2,left=262,foo=bar,height=500,width=500');
                return {
                    location: url,
                    focus() {
                        focus = true;
                    }
                };
            });
            spyOn(browserDialog, 'listen' as any).and.callFake(async () => {
                listen = true;
                return 'https://example.com';
            });
            spyOn(BrowserDialog, 'parseUrl' as any).and.callFake((url) => {
                expect(url).toBe('https://example.com');
                parseUrl = true;
            });

            return browserDialog.open('https://example.com').then(() => {
                expect(focus).toBeTruthy();
                expect(parseUrl).toBeTruthy();
                expect(listen).toBeTruthy();
                expect((browserDialog as any)._popup.location).toBe('https://example.com');
            });
        });
    });

    describe('listen()', () => {
        it('should return promise resolve location if url is equals to redirectUri', () => {
            let browserDialog = new (BrowserDialog as any)('provider', 'https://example.com', {});
            let a = document.createElement('a');
            a.href = 'https://example.com?foo=bar#color=red';
            browserDialog._popup = {
                closed: false,
                location: a
            };
            return browserDialog.listen().then((url) => {
                expect(url).toBe('https://example.com:443/?foo=bar#color=red');
            });
        });

        it('should return promise reject if dialog closed', () => {
            let browserDialog = new (BrowserDialog as any)('', '');
            browserDialog._popup = {
                closed: true
            };
            return browserDialog.listen().catch(error => {
                expect(error.message).toBe('The dialog was closed');
            });
        });
    });
});
