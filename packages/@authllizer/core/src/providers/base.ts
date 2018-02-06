import extendClass from '../utils/extend-class';
import extend from '../utils/extend';
import forEach from '../utils/for-each';
import { IProvider } from './provider';
import { IAdapter, IAdapterResponse, IAdapterRequestOptions } from '../adapters/adapter';
import { IDialogConstructor } from '../dialogs/dialog';
import { Directory } from '../interface';

export interface IBaseProviderOptions {
    name?: string;
    redirectUri?: string;
    authorizationEndpoint?: string;
    displayOptions?: Directory<any>;

    [key: string]: any;
}

export abstract class BaseProvider implements IProvider {

    static extend: (options: IBaseProviderOptions) => typeof BaseProvider = extendClass;

    public name: string;
    protected redirectUri: string = window.location.origin;
    protected authorizationEndpoint: string;
    protected displayOptions: Directory<any>;

    protected _adapter: IAdapter;
    protected _dialog: IDialogConstructor;

    constructor(adapter: IAdapter, dialogClass: IDialogConstructor) {
        this._adapter = this._adapter || adapter;
        this._dialog = this._dialog || dialogClass;
    }

    protected openDialog<T extends Directory<any>>(url: string): Promise<T> {
        let { _dialog: Dialog, name, redirectUri, displayOptions } = this;
        let dialog = new Dialog(name, redirectUri, displayOptions);
        return dialog.open(url).then((response) => {
            this.checkDialogResponse(response);
            return response;
        }) as any;
    }

    /**
     * this method can be overridden, for handling unique provider dialog errors
     * @param params
     */
    protected checkDialogResponse(params: Directory<any> = {}): void {
        if (params.error) {
            throw new Error(params.error);
        }
    }

    protected prepareData(requestKeys: Directory<string>, ...args: Directory<any>[]): Directory<any> {
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

    public abstract authenticate<R>(requestOptions: IAdapterRequestOptions): Promise<IAdapterResponse<R>>;
}
