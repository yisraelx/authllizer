/**
 * @resource https://github.com/electron/electron/blob/master/docs/api/browser-window.md
 */
import {Config, PopupDialog, IBaseDialogOptions, Directory} from '@authllizer/core';
import {BrowserWindowConstructorOptions} from 'electron';

export interface IElectronDialogOptions extends IBaseDialogOptions {
    displayOptions?: BrowserWindowConstructorOptions;
}

export class ElectronDialog extends PopupDialog {

    static extend: (options: IElectronDialogOptions) => typeof ElectronDialog;

    protected displayOptions: BrowserWindowConstructorOptions;

    protected setDisplayOptions(displayOptions: IElectronDialogOptions) {
        super.setDisplayOptions({
            width: 800,
            height: 600,
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: false
            }
        }, displayOptions);
    }

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
        return new Config.Promise((resolve, reject) => {
            let listener = (url: string) => {
                if (url.indexOf(this.redirectUri) === 0) {
                    this.close();
                    resolve(url);
                }
            };
            this._popup.webContents.on('will-navigate', (event, url: string) => {
                listener(url);
            });
            this._popup.webContents.on('did-get-redirect-request', (event, oldUrl: string, newUrl: string) => {
                listener(newUrl);
            });

            this._popup.webContents.on('did-fail-load', () => {
                reject(new Error('Authorization failed'));
            });

            this._popup.webContents.on('close', () => {
                reject(new Error('The dialog was closed'));
            });
        });
    }
}
