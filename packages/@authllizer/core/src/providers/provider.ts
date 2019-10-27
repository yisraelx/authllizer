import { IAdapter, IAdapterRequestOptions, IAdapterResponse } from '../adapters/adapter';
import { IDialogConstructor } from '../dialogs/dialog';

export interface IProviderConstructor {

    readonly prototype: IProvider;
    new(adapter: IAdapter, dialogClass: IDialogConstructor): IProvider;
}

export interface IProvider {

    authenticate<R>(requestOptions: IAdapterRequestOptions): Promise<IAdapterResponse<R>>;
}
