import { IDirectory } from '../interface';

export interface IDialogConstructor {
    readonly prototype: IDialog;
    new(name: string, redirectUri: string, displayOptions: any): IDialog;
}

export interface IDialog {
    open(url: string): Promise<IDirectory<any>>;
}
