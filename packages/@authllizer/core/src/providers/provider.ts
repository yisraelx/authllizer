import { IAdapter, IAdapterResponse, IAdapterRequestOptions } from '../adapters/adapter';
import { IDialogConstructor } from '../dialogs/dialog';

export interface IProviderConstructor {

    new(adapter: IAdapter, dialogClass: IDialogConstructor): IProvider;

    readonly prototype: IProvider;
}

export interface IProvider {

    authenticate<R>(requestOptions: IAdapterRequestOptions): Promise<IAdapterResponse<R>>;
}
