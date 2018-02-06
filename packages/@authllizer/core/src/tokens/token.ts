
export interface ITokenConstructor {
    new(token: any): IToken;
    readonly prototype: IToken;
}

export interface IToken {

    /**
     * for storage that can expire auto
     */
    readonly expire: Date;

    /**
     * for isAuthenticated
     */
    isValid(): boolean;

    /**
     * for the interceptor to set the token in the header
     */
    toHeader(): string;

    /**
     * for the storage to set the token in the storage
     */
    toString(): string;

}
