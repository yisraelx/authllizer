import { IAdapter, IAdapterRequestOptions, IAdapterResponse } from '../adapters/adapter';
import { IDialogConstructor } from '../dialogs/dialog';
import { IDirectory } from '../interface';
import extend from '../utils/extend';
import extendClass from '../utils/extend-class';
import forEach from '../utils/for-each';
import { IProvider } from './provider';

export interface IBaseProviderOptions {
    name?: string;
    redirectUri?: string;
    authorizationEndpoint?: string;
    displayOptions?: IDirectory<any>;

    [key: string]: any;
}

export abstract class BaseProvider implements IProvider {

    static extend: (options: IBaseProviderOptions) => typeof BaseProvider = extendClass;

    public name: string;
    protected redirectUri: string = window.location.origin;
    protected authorizationEndpoint: string;
    protected displayOptions: IDirectory<any>;

    protected _adapter: IAdapter;
    protected _dialog: IDialogConstructor;

    constructor(adapter: IAdapter, dialogClass: IDialogConstructor) {
        this._adapter = this._adapter || adapter;
        this._dialog = this._dialog || dialogClass;
    }

    public abstract authenticate<R>(requestOptions: IAdapterRequestOptions): Promise<IAdapterResponse<R>>;

    protected openDialog<T extends IDirectory<any>>(url: string): Promise<T> {
        let { _dialog: Dialog, name, redirectUri, displayOptions } = this;
        let dialog = new Dialog(name, redirectUri, displayOptions);

        return dialog
            .open(url)
            .then((response) => {
                this.checkDialogResponse(response);
                return response;
            }) as any;
    }

    /**
     * this method can be overridden, for handling unique provider dialog errors
     * @param params
     */
    protected checkDialogResponse(params: IDirectory<any> = {}): void {
        if (params.error) {
            throw new Error(params.error);
        }
    }

    protected prepareData(requestKeys: IDirectory<string>, ...args: IDirectory<any>[]): IDirectory<any> {
        let params = {};
        let data = extend(...args);
        forEach(requestKeys, (requestKey: string, key: string) => {
            if (!key) {
                return;
            }
            let value = data[key] || this[key];
            if (value) {
                params[requestKey] = value;
            }
        });
        return params;
    }

}
