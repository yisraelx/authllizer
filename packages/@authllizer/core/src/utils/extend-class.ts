import merge from './merge';

export default function extendClass(this: any, options: any): any {
    /* eslint-disable constructor-super */
    return class extends (this as ({new(...args)})) {
        constructor(...args: any[]) {
            super(...args);
            merge(this, options);
        }
    };
}
