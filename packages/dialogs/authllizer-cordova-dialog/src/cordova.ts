import { IBaseDialogOptions, PopupDialog } from '@authllizer/core';

export interface ICordovaDisplayOptions {
    location?: 'yes' | 'no';

    [key: string]: any;
}

export interface ICordovaAndroidDialogOptions extends ICordovaDisplayOptions {
    hidden?: 'yes' | 'no';
    clearcache?: 'yes' | 'no';
    clearsessioncache?: 'yes' | 'no';
    zoom?: 'yes' | 'no';
    hardwareback?: 'yes' | 'no';
    mediaPlaybackRequiresUserAction?: 'yes' | 'no';
    shouldPauseOnSuspend?: 'yes' | 'no';
    useWideViewPort?: 'yes' | 'no';
}

export interface ICordovaIosDialogOptions extends ICordovaDisplayOptions {
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

export interface ICordovaWindowDialogOptions extends ICordovaDisplayOptions {
    hidden?: 'yes' | 'no';
    fullscreen?: 'yes' | 'no';
    hardwareback?: 'yes' | 'no';
}

export interface ICordovaDialogOptions extends IBaseDialogOptions {
    displayOptions?: ICordovaDisplayOptions | ICordovaAndroidDialogOptions | ICordovaIosDialogOptions | ICordovaWindowDialogOptions;
}

/**
 * @resource https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser/
 */
export class CordovaDialog extends PopupDialog {

    static extend: (options: ICordovaDialogOptions) => typeof CordovaDialog;

    protected displayOptions: ICordovaDisplayOptions | ICordovaAndroidDialogOptions | ICordovaIosDialogOptions | ICordovaWindowDialogOptions;

    public open(url: string) {
        this._popup = window.open(url, '_blank', this.stringDisplayOptions) as Window;
        this.focus();

        return this
            .listen()
            .then(CordovaDialog.parseUrl);
    }

    protected setDisplayOptions(displayOptions: ICordovaDisplayOptions) {
        delete displayOptions.width;
        delete displayOptions.height;
        super.setDisplayOptions({
            location: 'yes'
        }, displayOptions);
    }

    private listen(): Promise<string> {
        return new Promise((resolve, reject) => {
            this
                ._popup
                .addEventListener('loadstart', ({ url }: {url: string}) => {
                    if (url.indexOf(this.redirectUri) === 0) {
                        this.close();
                        resolve(url);
                    }
                });

            this
                ._popup
                .addEventListener('loaderror', () => {
                    reject(new Error('Authorization failed'));
                });

            this
                ._popup
                .addEventListener('exit', () => {
                    reject(new Error('The dialog was closed'));
                });
        });
    }

}
