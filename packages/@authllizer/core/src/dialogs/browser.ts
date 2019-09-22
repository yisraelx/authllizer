import normalizeLocation from '../utils/normalize-location';
import { PopupDialog } from './popup';
import { Directory } from '../interface';

export interface IBrowserDisplayOptions {
    channelmode?: 'yes' | 'no' | 1 | 0;
    directories?: 'yes' | 'no' | 1 | 0;
    fullscreen?: 'yes' | 'no' | 1 | 0;
    height?: number;
    left?: number;
    location?: 'yes' | 'no' | 1 | 0;
    menubar?: 'yes' | 'no' | 1 | 0;
    resizable?: 'yes' | 'no' | 1 | 0;
    scrollbars?: 'yes' | 'no' | 1 | 0;
    status?: 'yes' | 'no' | 1 | 0;
    titlebar?: 'yes' | 'no' | 1 | 0;
    toolbar?: 'yes' | 'no' | 1 | 0;
    top?: number;
    width?: number;

    [key: string]: any;
}

export interface IBrowserDialogOptions {
    displayOptions?: IBrowserDisplayOptions;
}

export class BrowserDialog extends PopupDialog {

    static extend: (options: IBrowserDialogOptions) => typeof BrowserDialog;

    protected get dialogName(): string {
        return window.navigator.userAgent.indexOf('CriOS') > -1 ? '_blank' : this.name;
    }

    protected displayOptions: IBrowserDisplayOptions;

    protected setDisplayOptions(displayOptions: IBrowserDisplayOptions = {}) {
        displayOptions.height = displayOptions.height || 500;
        displayOptions.width = displayOptions.width || 500;
        super.setDisplayOptions({
            top: window.screenY + ((window.outerHeight - displayOptions.height) / 2.5),
            left: window.screenX + ((window.outerWidth - displayOptions.width) / 2)
        }, displayOptions);
    }

    public open(url: string): Promise<Directory<any>> {
        this._popup = window.open(url, this.dialogName, this.stringDisplayOptions) as Window;
        this.focus();
        return this.listen().then((url) => {
            return BrowserDialog.parseUrl(url);
        });
    }

    private listen(): Promise<string> {
        return new Promise((resolve, reject) => {
            let redirectUri = normalizeLocation(this.redirectUri, { path: true });

            let intervalId = setInterval(() => {
                if (this.isClosed()) {
                    clearInterval(intervalId);
                    return reject(new Error('The dialog was closed'));
                }

                try {
                    let url: string = normalizeLocation(this._popup.location, { path: true, data: true });

                    if (url.indexOf(redirectUri) === 0) {
                        this.close();
                        clearInterval(intervalId);
                        resolve(url);
                    }

                } catch (error) {
                    // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
                    // A hack to get around same-origin security policy errors in IE.
                }
            }, 500);
        });
    }
}
