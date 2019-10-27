import { LocalStorage } from '../../src/storages/local';

describe('LocalStorage', () => {
    describe('getToken()', () => {
        it('should get token from localStorage', () => {
            let token: string = '*.*.*';
            spyOn(Storage.prototype, 'getItem').and.callFake((key: string) => {
                expect(key).toBe('access_token');
                return token;
            });
            let storage = new LocalStorage;
            expect(storage.getToken()).toBe(token);
        });

        it('should get token from memoryStorage', () => {
            let token: string = '*.*.*';
            spyOn(Storage.prototype, 'getItem').and.callFake((key: string) => {
                throw new Error();
            });
            let storage = new LocalStorage;
            (storage as any)._storage['access_token'] = token;
            expect(storage.getToken()).toBe(token);
        });
    });

    describe('setToken()', () => {
        it('should set token in localStorage', () => {
            let token: string = '*.*.*';
            spyOn(Storage.prototype, 'setItem').and.callFake((key: string, value: string) => {
                expect(key).toBe('access_token');
                expect(value).toBe(token);
            });
            let storage = new LocalStorage;
            storage.setToken(token as any);
        });

        it('should set token in memoryStorage', () => {
            let token: string = '*.*.*';
            spyOn(Storage.prototype, 'setItem').and.callFake((key: string) => {
                throw new Error();
            });
            let storage = new LocalStorage;
            storage.setToken(token as any);
            let value = (storage as any)._storage['access_token'];
            expect(value).toBe(token);
        });
    });

    describe('removeToken()', () => {
        it('should remove token from localStorage', () => {
            let token: string = '*.*.*';
            let storage = new LocalStorage;
            storage.setToken(token as any);
            storage.removeToken();
            expect(storage.getToken()).toBeNull();
        });

        it('should remove token from memoryStorage', () => {
            spyOn(Storage.prototype, 'removeItem').and.callFake((key: string) => {
                throw new Error();
            });
            let storage = new LocalStorage;
            storage.setToken('*.*.*' as any);
            storage.removeToken();
            let value = (storage as any)._storage['access_token'];
            expect(value).toBeUndefined();
        });
    });
});
