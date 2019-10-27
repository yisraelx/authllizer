/* eslint-disable @typescript-eslint/interface-name-prefix */
import forEach from './for-each';
import isFunction from './is-function';

export interface Listener<T> {
    (value?: T): void;
}

export default class EventEmitter<T> {

    protected _listeners: Listener<T>[] = [];

    constructor(...listeners: Listener<T>[]) {
        this.on(...listeners);
    }

    public emit(value?: T): this {
        forEach(this._listeners, (listener) => {
            listener(value);
        });
        return this;
    }

    public on(...listeners: Listener<T>[]): this {
        forEach(listeners, (listener) => {
            if (isFunction(listener)) {
                this._listeners.push(listener);
            }
        });
        return this;
    }

    public remove(...listeners: Listener<T>[]): this {
        forEach(listeners, (listener) => {
            let index = this._listeners.indexOf(listener);
            if (index > -1) {
                this._listeners.splice(index, 1);
            }
        });
        return this;
    }

}
