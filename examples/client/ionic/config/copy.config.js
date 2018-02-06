var resolvePackagePath = require('./helper').resolvePackagePath;
// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string
module.exports = {
  copyAssets: {
    src: ['{{SRC}}/assets/**/*'],
    dest: '{{WWW}}/assets'
  },
  copyIndexContent: {
    src: ['{{SRC}}/index.html', '{{SRC}}/manifest.json', '{{SRC}}/service-worker.js'],
    dest: '{{WWW}}'
  },
  copyFonts: {
    src: [resolvePackagePath('ionicons','dist/fonts/**/*'),resolvePackagePath('ionic-angular','fonts/**/*')],
    dest: '{{WWW}}/assets/fonts'
  },
  copyFontAwesome: {
    src: [resolvePackagePath('font-awesome','fonts/**/*')],
    dest: '{{WWW}}/assets/fonts'
  },
  copyPolyfills: {
    src: [resolvePackagePath('ionic-angular','polyfills',process.env.IONIC_POLYFILL_FILE_NAME)],
    dest: '{{BUILD}}'
  },
  copySwToolbox: {
    src: [resolvePackagePath('sw-toolbox','sw-toolbox.js')],
    dest: '{{BUILD}}'
  }
};
