# Simple Front-end Development Environment

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/ariariasria/tool/blob/master/LICENSE)

web develop environment. Babel / libsass / Webpack

## Overview

Simple front-end development environment. Right for simple static site.

- compile Scss and ES6 Javascript

## Description

``` 
┣ frontend-dev-env - front develop  
　 ┣ assets  
　　 ┣ js  
　　 ┗ sass  
　　　 ┣ components  
　　　 ┗ page  
　 ┣ .babelrc           - Version specification setting file when converting with babel  
　 ┣ .editorconfig      - Coding style setting file  
　 ┣ .eslintrc          - eslint configuration file  
　 ┣ .stylelintrc.json  - scss configuration file  
　 ┣ gulpfile.babel.js  - gulp configuration file  
　 ┣ package.json       - package configuration file  
　 ┣ README.md  
　 ┗ webpack.config.js  - webpack configuration file  
┗ www - Public directory  
　 ┣ assets  
　　 ┣ bundle  
　　 ┗ images  
　 ┗ index.html  
```

The paths to `css` and `js` which are published in each setting file are written.  
Please change it if necessary.

## Requirement

- [node-sass](https://www.npmjs.com/package/node-sass)
- [webpack](https://webpack.github.io/)
  - [DevServer](https://webpack.js.org/configuration/dev-server/)
  - [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)
  - [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)
  - [webpack-remove-empty-scripts](https://github.com/webdiscus/webpack-remove-empty-scripts)
  - [terser-webpack-plugin](https://webpack.js.org/plugins/terser-webpack-plugin/)
  - [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/)
- [Babel](https://babeljs.io/)

## Usage

Clone to any directory.

```
$ cd ./frontend-dev-env
```

Install package.

```
$ npm install

or

$ yarn install
```

### Run

Monitoring is started for scss and js files in public's assets directory.

```
$ yarn run dev
```

### Dev Server

liveReload and open browser.

```
liveReload: true,
compress: true,
port: 8080,
open: true
```

### SCSS

If you save `/frontend-dev-env/assets/sass/style.scss` in the development directory with an editor,
The following two files are generated.

`/www/assets/bundle/css/style.css`

### JavaScript

#### Add file

Javascript describes the target to be monitored in `webpack.config.js`.  
If you save `/ frontend-dev-env / assets / js / app.js` in the development directory with an editor etc, webpack converts it to ECMAScript 5.  
The following two files are generated.

`/www/assets/js/bundle/app.js`

If you want to add files,
`entry` of `webpack.config.js`

```
entry: {
  app: '../www/assets/js/app.js',
  something: '../www/assets/js/something.js',
},
```

Please add the name and path of `something: '../www/assets/js/something.js'` and js file name as above.

## Install

`$ git clone https://github.com/ariariasria/frontend-dev-env.git`

## Licence

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/ariariasria/tool/blob/master/LICENSE)

## Author

[@ariariasria](https://github.com/ariariasria)
