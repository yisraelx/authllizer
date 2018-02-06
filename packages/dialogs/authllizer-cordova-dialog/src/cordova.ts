/**
 * @resource https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser/
 */
import {PopupDialog, IBaseDialogOptions, Config, Directory} from '@authllizer/core';

export interface ICorodvaDisplayOptions {
    location?: 'yes' | 'no';

    [key: string]: any;
}

export interface ICordovaAndroidDialogOptions extends ICorodvaDisplayOptions {
    hidden?: 'yes' | 'no';
    clearcache?: 'yes' | 'no';
    clearsessioncache?: 'yes' | 'no';
    zoom?: 'yes' | 'no';
    hardwareback?: 'yes' | 'no';
    mediaPlaybackRequiresUserAction?: 'yes' | 'no';
    shouldPauseOnSuspend?: 'yes' | 'no';
    useWideViewPort?: 'yes' | 'no';
}

export interface ICordovaIosdDialogOptions extends ICorodvaDisplayOptions {
    closebuttoncaption?: string;
    disallowoverscroll?: 'yes' | 'no';
    clearcache?: 'yes' | 'no';
    clearsessioncache?: 'yes' | 'no';
    toolbar?: 'yes' | 'no';
    enableViewportScale?: 'yes' | 'no';
    mediaPlaybackRequiresUserAction?: 'yes' | 'no';
    allowInlineMediaPlayback?: 'yes' | 'no';
    keyboardDisplayRequiresUserAction?: 'yes' | 'no';
    suppressesIncrementalRendering?: 'yes' | 'no';
    presentationstyle?: 'pagesheet' | 'formsheet' | 'fullscreen';
    transitionstyle?: 'fliphorizontal' | 'crossdissolve' | 'coververtical';
    toolbarposition?: 'top' | 'bottom';
}

export interface ICordovaWindowDialogOptions extends ICorodvaDisplayOptions {
    hidden?: 'yes' | 'no';
    fullscreen?: 'yes' | 'no';
    hardwareback?: 'yes' | 'no';
}

export interface ICordovaDialogOptions extends IBaseDialogOptions {
    displayOptions?: ICorodvaDisplayOptions | ICordovaAndroidDialogOptions | ICordovaIosdDialogOptions | ICordovaWindowDialogOptions;
}

export class CordovaDialog extends PopupDialog {

    static extend: (options: ICordovaDialogOptions) => typeof CordovaDialog;

    protected displayOptions: ICorodvaDisplayOptions | ICordovaAndroidDialogOptions | ICordovaIosdDialogOptions | ICordovaWindowDialogOptions;

    protected setDisplayOptions(displayOptions: ICorodvaDisplayOptions) {
        delete displayOptions.width;
        delete displayOptions.height;
        super.setDisplayOptions({
            location: 'yes'
        }, displayOptions);
    }

    public open(url: string): Promise<Directory<any>> {
        this._popup = window.open(url, '_blank', this.stringDisplayOptions) as Window;
        this.focus();
        return this.listen().then((url) => {
            return CordovaDialog.parseUrl(url);
        });
    }

    private listen(): Promise<string> {
        return new Config.Promise((resolve, reject) => {
            this._popup.addEventListener('loadstart', ({url}: { url: string }) => {
                if (url.indexOf(this.redirectUri) === 0) {
                    this.close();
                    resolve(url);
                }
            });

            this._popup.addEventListener('loaderror', () => {
                reject(new Error('Authorization failed'));
            });

            this._popup.addEventListener('exit', () => {
                reject(new Error('The dialog was closed'));
            });
        });
    }
}
