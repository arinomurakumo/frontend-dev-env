# Construction of front-end development environment [Babel / libsass / Webpack / gulp]

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/sc-ariman/tool/blob/master/LICENSE)

web develop environment.

## Overview

- Serialize tasks
- Compile with Scss libsass
- Automatically add prefix with CSS Autoprefixer
- Compress after CSS compilation
- Manage JavaScript with JavaScript webpack
- Compile ES6 with JavaScript Babel
- Compression after JavaScript compilation

## Description

/  
┣ /frontend-dev-env - front develop  
　 ┣ /assets  
　　 ┣ /js  
　　 ┗ /sass  
　　　 ┣ /components  
　　　 ┗ /page  
　 ┣ .babelrc  - Version specification setting file when converting with babel  
　 ┣ .editorconfig - Coding style setting file  
　 ┣ .eslintrc - eslint configuration file  
　 ┣ .stylelintrc.json - scss configuration file  
　 ┣ gulpfile.babel.js - gulp configuration file  
　 ┣ package.json - npm package configuration file  
　 ┣ README.md  
　 ┗ webpack.config.js - webpack configuration file  
┗ /www - Public directory  
　 ┣ /assets  
　　 ┣ /css  
　　　 ┗ /page 
　　 ┣ /js  
　　　 ┗ /bundle  
　　 ┗ /images  
　 ┗ index.html  
  
The paths to `css` and `js` which are published in each setting file are written.  
Please change it if necessary.

## Requirement

- [npm](https://www.npmjs.com) - [gulp](http://gulpjs.com/) - [webpack](https://webpack.github.io/) - [Babel](https://babeljs.io/)

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
$ yarn run build
```

You can create a filename.min.js file in the public's assets directory.

```
$ yarn run build-p
```

You can also watch with a single action

```
$ yarn run gulp
$ yarn run webpack
```

### SCSS

If you save `/frontend-dev-env/assets/sass/style.scss` in the development directory with an editor,
The following two files are generated.

`/www/assets/css/style.css`
`/www/assets/css/style.min.css`

gulp-autoprefixer automatically prefixes

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
     hoge: '../www/assets/js/hoge.js',
   },
```

Please add the name and path of `hoge: '../ www / assets / js / hoge.js'` and js file name as above.

## Install

`$ git clone https://github.com/sc-ariman/frontend-dev-env.git`

## Licence

[MIT](https://github.com/sc-ariman/tool/blob/master/LICENSE)

## Author

[@arima7th](https://twitter.com/arima7th)
