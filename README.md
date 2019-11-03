# Authllizer
[![Travis build](https://travis-ci.org/yisraelx/authllizer.svg?branch=master)](https://travis-ci.org/yisraelx/authllizer)
[![Codecov](https://codecov.io/gh/yisraelx/authllizer/branch/master/graph/badge.svg)](https://codecov.io/gh/yisraelx/authllizer)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/yisraelx/authllizer/blob/master/LICENSE)

[![TypeScript](https://img.shields.io/badge/100%25-TypeScript-blue.svg)](https://www.typescriptlang.org)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![Tested With Jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

### Authllizer is a authentication framework for the client-side of javascript applications, written in typescript.

## Packages
  * [@authllizer/core](https://www.npmjs.com/package/@authllizer/core) - Authllizer Library  
  * [@authllizer/ng](https://www.npmjs.com/package/@authllizer/ng) - Authllizer Module for AngularJs
  * [@authllizer/ngx](https://www.npmjs.com/package/@authllizer/ngx) - Authllizer Module for Angular X
  * [@authllizer/vue](https://www.npmjs.com/package/@authllizer/vue)  - Authllizer Plugin for VueJs

## Examples
There are example projects in the [source code](https://github.com/yisraelx/authllizer/blob/master/examples).
  * [Electron](https://github.com/yisraelx/authllizer/blob/master/examples/client/electron) - Desktop app built with [Electron](https://electronjs.org) and [React](https://reactjs.org)
  * [Ionic](https://github.com/yisraelx/authllizer/blob/master/examples/client/ionic) - Mobile app built with [Ionic](https://ionicframework.com) and [Angular](https://angular.io)
  * [AngularJs](https://github.com/yisraelx/authllizer/blob/master/examples/client/ng) - Web app built with [AngularJs](https://angularjs.org)
  * [Angular X](https://github.com/yisraelx/authllizer/blob/master/examples/client/ngx) - Web app built with [Angular](https://angular.io)
  * [VueJs](https://github.com/yisraelx/authllizer/blob/master/examples/client/vue) - Web app built with [VueJs](https://vuejs.org)

## Docs
There is [docs and examples](https://github.com/yisraelx/authllizer/blob/master/docs) but it is very limited hope that it will change later (help wanted).

## Scripts
  * bootstrap - for install and link all the dependencies in all packages in the repo (with yarn workspace). 
  * commit - for commit with commitizen for conventional changelog.
  * lint - run tslint an all the *.ts file in the packages. 
  * test - run test on all packages. 

## Test
There are partial tests, the goal is for full coverage.
```sh
$ yarn install
$ yarn test
```

## TODO:
  * Add example for
    - [ ] React
  * Add dialog for
    - [ ] React Native
    - [ ] Native Script

## Credits
This library is based on AngularJs [Satellizer](https://github.com/sahat/satellizer) library developed by [Sahat Yalkabov](https://github.com/sahat).

## License
Copyright © 2017 [Yisrael Eliav](https://github.com/yisraelx),
Licensed under the [MIT license](https://github.com/yisraelx/authllizer/blob/master/LICENSE).
