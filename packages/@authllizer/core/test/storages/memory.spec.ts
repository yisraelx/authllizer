import {MemoryStorage} from '../../src/storages/memory';

describe('MemoryStorage', () => {
    describe('getToken()', () => {
        it('should get token from memoryStorage', () => {
            let token: string = '*.*.*';
            let storage = new MemoryStorage;
            (storage as any)._storage[storage.key] = token;
            expect(storage.getToken()).toBe(token);
        });
    });

    describe('setToken()', () => {
        it('should set token in memoryStorage', () => {
            let token: string = '*.*.*';
            let storage = new MemoryStorage;
            storage.setToken(token as any);
            expect((storage as any)._storage[storage.key]).toBe(token);
        });
    });

    describe('removeToken()', () => {
        it('should remove token from memoryStorage', () => {
            let token: string = '*.*.*';
            let storage = new MemoryStorage;
            storage.setToken(token as any);
            storage.removeToken();
            expect(storage.getToken()).toBeUndefined();
        });
    });
});
