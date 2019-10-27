let {fromCharCode} = String;

let re_btou = new RegExp([
    '[\xC0-\xDF][\x80-\xBF]',
    '[\xE0-\xEF][\x80-\xBF]{2}',
    '[\xF0-\xF7][\x80-\xBF]{3}'
].join('|'), 'g');

let cb_btou = (cccc: string) => {
    switch (cccc.length) {
        case 4: {
            let cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                | ((0x3f & cccc.charCodeAt(1)) << 12)
                | ((0x3f & cccc.charCodeAt(2)) << 6)
                | (0x3f & cccc.charCodeAt(3));
            let offset = cp - 0x10000;
            return (fromCharCode((offset >>> 10) + 0xD800)
                + fromCharCode((offset & 0x3FF) + 0xDC00));
        }
        case 3: {
            return fromCharCode(
                ((0x0f & cccc.charCodeAt(0)) << 12)
                | ((0x3f & cccc.charCodeAt(1)) << 6)
                | (0x3f & cccc.charCodeAt(2))
            );
        }
        default:
            return fromCharCode(
                ((0x1f & cccc.charCodeAt(0)) << 6)
                | (0x3f & cccc.charCodeAt(1))
            );
    }
};

let btou = (b: string) => {
    return b.replace(re_btou, cb_btou);
};

let _decode = (a: any) => {
    return btou(atob(a));
};

export default function decodeBase64(str: string): string {
    return _decode(
        String(str)
            .replace(/[-_]/g, (m0) => {
                return m0 === '-' ? '+' : '/';
            })
            .replace(/[^A-Za-z0-9\+\/]/g, '')
    );
}
