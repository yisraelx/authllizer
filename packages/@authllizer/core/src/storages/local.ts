import { IToken } from '../tokens/token';
import { MemoryStorage } from './memory';
import { IStorage } from './storage';

export class LocalStorage extends MemoryStorage implements IStorage {
    public type: string;

    public getToken(): string {
        try {
            return localStorage.getItem(this.key) as string;
        } catch {
            return super.getToken();
        }
    }

    public setToken(token: IToken): void {
        try {
            localStorage.setItem(this.key, token.toString());
        } catch {
            super.setToken(token);
        }
    }

    public removeToken(): void {
        try {
            localStorage.removeItem(this.key);
        } catch {
            super.removeToken();
        }
    }
}
