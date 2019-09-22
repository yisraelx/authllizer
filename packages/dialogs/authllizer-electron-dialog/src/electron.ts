/**
 * @resource https://github.com/electron/electron/blob/master/docs/api/browser-window.md
 */
import {PopupDialog, IBaseDialogOptions, Directory} from '@authllizer/core';
import {BrowserWindowConstructorOptions} from 'electron';

export interface IElectronDialogOptions extends IBaseDialogOptions {
    displayOptions?: BrowserWindowConstructorOptions;
}

export class ElectronDialog extends PopupDialog {

    static extend: (options: IElectronDialogOptions) => typeof ElectronDialog;

    protected displayOptions: BrowserWindowConstructorOptions;

    public open(url: string): Promise<Directory<any>> {
        let {BrowserWindow} = (window as any).require('electron').remote;
        this._popup = new BrowserWindow(this.displayOptions);
        this._popup.loadURL(url);
        this.focus();
        return this.listen().then((url: string) => {
            return ElectronDialog.parseUrl(url);
        });
    }

    private listen(): Promise<string> {
        return new Promise((resolve, reject) => {
            let listener = (event: Event, url: string) => {
                if (url.indexOf(this.redirectUri) === 0) {
                    event.preventDefault();
                    this.close();
                    resolve(url);
                }
            };

            this
                ._popup
                .webContents
                .on('will-redirect', listener)
                .on('will-navigate', listener)
                .on('did-fail-load', () => reject(new Error('Authorization failed')))
                .on('close', () => reject(new Error('The dialog was closed')));
        });
    }
}
