import isFunction from '../utils/is-function';
import isObject from '../utils/is-object';
import stringifyQuery from '../utils/stringify-query';
import { BaseDialog } from './base';

export abstract class PopupDialog extends BaseDialog {

    protected _popup: any;

    protected get stringDisplayOptions(): string {
        return stringifyQuery(this.displayOptions);
    }

    protected close() {
        if (this._popup && isObject(this._popup) && isFunction(this._popup.close)) {
            this._popup.close();
        }
    }

    protected focus() {
        if (this._popup && isObject(this._popup) && isFunction(this._popup.focus)) {
            this._popup.focus();
        }
    }

    protected isClosed() {
        return !this._popup || this._popup.closed || this._popup.closed === void 0;
    }

}
