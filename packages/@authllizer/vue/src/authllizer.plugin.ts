import 'vue';
import {Authllizer, IAuthllizerOptions} from '@authllizer/core';

declare module 'vue/types/vue' {

    interface Vue {
        $auth: Authllizer;
    }

    interface VueConstructor {
        authllizer: Authllizer;
    }

}

let isInstall: boolean = false;

export function plugin(Vue: any, options: IAuthllizerOptions) {

    if (isInstall) {
        return;
    }
    isInstall = true;

    Vue.authllizer = new Authllizer(options);

    Object.defineProperties(Vue.prototype, {
        $auth: {
            get(): Authllizer {
                return Vue.authllizer;
            }
        }
    });

}
