import { PopupDialog } from '../../src/dialogs/popup';

describe('PopupDialog', () => {

    describe('stringDisplayOptions', () => {
        it('should be return display options as string', () => {
            let popup = new (PopupDialog as any)('', '', { width: 100, height: 100, foo: 'bar' });
            expect(popup.stringDisplayOptions).toBe('width=100,height=100,foo=bar');
        });

        it('should be return empty display options as string', () => {
            let popup = new (PopupDialog as any)();
            expect(popup.stringDisplayOptions).toBe('');
        });
    });

    describe('focus()', () => {
        it('should be call to _popup.focus', () => {
            let called = false;
            let dialogMock = {
                _popup: {
                    focus() {
                        called = true;
                    }
                }
            };
            (PopupDialog.prototype as any).focus.call(dialogMock);
            expect(called).toBeTruthy();
        });

        it('should skip if no _popup.focus method', () => {
            let called = false;
            let dialogMock = {
                _popup: {
                    get focus() {
                        called = true;
                        return void 0;
                    }
                }
            };
            (PopupDialog.prototype as any).focus.call(dialogMock);
            expect(called).toBeTruthy();
        });
    });

    describe('close()', () => {
        it('should be call to _popup.close', () => {
            let called = false;
            let dialogMock = {
                _popup: {
                    close() {
                        called = true;
                    }
                }
            };
            (PopupDialog.prototype as any).close.call(dialogMock);
            expect(called).toBeTruthy();
        });

        it('should skip if no _popup.close method', () => {
            let called = false;
            let dialogMock = {
                _popup: {
                    get close() {
                        called = true;
                        return void 0;
                    }
                }
            };
            (PopupDialog.prototype as any).close.call(dialogMock);
            expect(called).toBeTruthy();
        });
    });

    describe('isClosed()', () => {
        it('should be return true if no popup', () => {
            let dialogMock = {};
            let isClosed = (PopupDialog.prototype as any).isClosed.call(dialogMock);
            expect(isClosed).toBeTruthy();
        });

        it('should be return true if popup.closed is true', () => {
            let dialogMock = {
                _popup: {
                    closed: true
                }
            };
            let isClosed = (PopupDialog.prototype as any).isClosed.call(dialogMock);
            expect(isClosed).toBeTruthy();
        });

        it('should be return true if popup.closed is undefined', () => {
            let dialogMock = {
                _popup: {}
            };
            let isClosed = (PopupDialog.prototype as any).isClosed.call(dialogMock);
            expect(isClosed).toBeTruthy();
        });
    });
});
