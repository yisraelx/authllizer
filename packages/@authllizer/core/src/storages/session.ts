import { IToken } from '../tokens/token';
import { MemoryStorage } from './memory';
import { IStorage } from './storage';

export class SessionStorage extends MemoryStorage implements IStorage {

    public getToken(): string {
        try {
            return sessionStorage.getItem(this.key) as string;
        } catch {
            return super.getToken();
        }
    }

    public setToken(token: IToken): void {
        try {
            sessionStorage.setItem(this.key, token.toString());
        } catch {
            super.setToken(token);
        }
    }

    public removeToken(): void {
        try {
            sessionStorage.removeItem(this.key);
        } catch {
            super.removeToken();
        }
    }

}
