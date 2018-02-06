import { IToken } from '../tokens/token';

export interface IStorage {
    getToken(): string;

    setToken(token: IToken): void;

    removeToken(): void;
}
