import { MemoryStorage } from './memory';
import { IStorage } from './storage';
import { IToken } from '../tokens/token';

export class LocalStorage extends MemoryStorage implements IStorage {
    public type: string;

    public getToken(): string {
        try {
            return localStorage.getItem(this.key) as string;
        } catch (e) {
            return super.getToken();
        }
    }

    public setToken(token: IToken): void {
        try {
            localStorage.setItem(this.key, token.toString());
        } catch (e) {
            super.setToken(token);
        }
    }

    public removeToken(): void {
        try {
            localStorage.removeItem(this.key);
        } catch (e) {
            super.removeToken();
        }
    }
}
