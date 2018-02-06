import { Directory } from '../interface';

export interface IDialogConstructor {
    new(name: string, redirectUri: string, displayOptions: any): IDialog;

    readonly prototype: IDialog;
}

export interface IDialog {
    open(url: string): Promise<Directory<any>>;
}
