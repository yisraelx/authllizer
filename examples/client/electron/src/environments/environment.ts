export interface IEnvironment {
    production: boolean;
    backendUrl: string;
    redirectUri: string;
}

export let environment: IEnvironment;
