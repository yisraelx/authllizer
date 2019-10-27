import { IDirectory } from '../interface';
import extend from '../utils/extend';
import extendClass from '../utils/extend-class';
import parseQuery from '../utils/parse-query';
import { IDialog } from './dialog';

export interface IBaseDialogOptions {
    name?: string;
    redirectUri?: string;
    displayOptions?: IDirectory<any>;
}

export abstract class BaseDialog implements IDialog {

    static extend: (options: IBaseDialogOptions) => typeof BaseDialog = extendClass;

    static parseUrl(url: string): IDirectory<any> {
        let location = document.createElement('a');
        location.href = url;
        if (location.search || location.hash) {
            let query = parseQuery(location.search.substring(1).replace(/\/$/, ''));
            let hash = parseQuery(location.hash.substring(1).replace(/[\/$]/, ''));

            return extend({}, query, hash);
        } else {
            throw new Error(
                'OAuth redirect has occurred but no query or hash parameters were found. ' +
                'They were either not set during the redirect, or were removed—typically by a ' +
                'routing library—before Authllizer could read it.'
            );
        }
    }

    protected name: string;
    protected redirectUri: string;
    protected displayOptions: IDirectory<any>;

    constructor(name: string, redirectUri: string, displayOptions: IDirectory<any>) {
        this.name = this.name || name;
        this.redirectUri = this.redirectUri || redirectUri;
        this.setDisplayOptions(displayOptions);
    }

    public abstract open(url: string): Promise<IDirectory<any>>;

    protected setDisplayOptions(...displayOptions: IDirectory<any>[]) {
        this.displayOptions = extend(this.displayOptions, ...displayOptions);
    }
}
