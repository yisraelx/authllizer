import EventEmitter from '../../src/utils/event-emitter';

describe('EventEmitter', () => {

    describe('emit()', () => {
        it('should get the emit data on the listener function', () => {
            let emitter = new EventEmitter<any>((value) => {
                expect(value).toBe('foo');
            });
            emitter.emit('foo');
        });
    });

    describe('on()', () => {
        it('should not set listener if no listener to set', () => {
            let emitter = new EventEmitter<any>();
            emitter.on();
            expect((emitter as any)._listeners.length).toBe(0);
        });

        it('should set one listener', () => {
            let listener = () => { };
            let emitter = new EventEmitter<any>();
            emitter.on(listener);
            expect((emitter as any)._listeners[0]).toBe(listener);
            expect((emitter as any)._listeners.length).toBe(1);
        });

        it('should set tow listeners', () => {
            let listeners = [() => { }, function () { }];
            let emitter = new EventEmitter<any>();
            emitter.on(...listeners);
            expect((emitter as any)._listeners).toEqual(listeners);
            expect((emitter as any)._listeners.length).toBe(2);
        });
    });

    describe('remove()', () => {
        it('should not remove listener if no listener to remove', () => {
            let emitter = new EventEmitter<any>(() => { });
            emitter.remove();
            expect((emitter as any)._listeners.length).toBe(1);
        });

        it('should remove one listener', () => {
            let listener = () => { };
            let emitter = new EventEmitter<any>(listener);
            emitter.remove(listener);
            expect((emitter as any)._listeners.length).toBe(0);
        });

        it('should remove tow listeners', () => {
            let listeners = [() => { }, function () { }];
            let emitter = new EventEmitter<any>(...listeners);
            emitter.remove(...listeners);
            expect((emitter as any)._listeners.length).toBe(0);
        });
    });
});
