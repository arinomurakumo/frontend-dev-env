# フロントエンド開発環境の構築[Babel / libsass / Webpack / gulp]

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/sc-ariman/tool/blob/master/LICENSE)

## Overview
 - タスクを直列処理する
 - Scss libsassでコンパイル
 - CSS Autoprefixerで自動でプレフィックスを付与
 - CSS コンパイル後に圧縮
 - JavaScript webpackでJavaScriptを管理
 - JavaScript BabelでES2015をコンパイル
 - JavaScript コンパイル後に圧縮

## Description
/  
┣ /frontend-dev-env    - 開発ディレクトリ  
　┣ /assets    
　　┣ /js  
　　┗ /sass  
　　　┣ /admin  
　　　┣ /components  
　　　┣ /mobile  
　　　┗ /page  
　┣ .babelrc          - babelで変換を行う際のバージョン指定設定ファイル  
　┣ .editorconfig     - コーディングスタイルの設定ファイル  
　┣ gulpfile.js       - gulpの設定ファイル  
　┣ package.json      - npmパッケージの設定ファイル  
　┣ README.md  
　┗ webpack.config.js  - webpackの設定ファイル  
┗ /www                 - 公開ディレクトリ  
　┣ /assets  
　　┣ /css  
　　　┣ /admin  
　　　┣ /mobile  
　　　┗ /page  
　　┣ /js  
　　　┗ /bundle  
　　┗ /images  
　┗ index.html  
  
各設定ファイルに `css` や `js` までのパスが書かれています。  
必要あれば変更して下さい。  

## Requirement
- [npm](https://www.npmjs.com)
	- [gulp](http://gulpjs.com/)
	- [webpack](https://webpack.github.io/)
	- [Babel](https://babeljs.io/)
		- babel-core
		- babel-loader
	- [Karma](https://karma-runner.github.io/1.0/index.html)

### Install package
- babel-core
- babel-loader
- babel-preset-env
- gulp
- gulp-autoprefixer
- gulp-clean-css
- gulp-notify
- gulp-plumber
- gulp-rename
- gulp-sass
- gulp-sourcemaps
- gulp-uglify
- gulp-webpack
- path
- jasmine-core
- karma
- karma-chrome-launcher
- karma-jasmine
- webpack

## Usage
frontend-dev-envを利用したい任意のディレクトリに、クローンしたディレクトリをコピーして移動します。

```
$ cd /Users/username/workspace/your-project/frontend-dev-env
```

gulpとpackage.json内の必要なプラグインをインストール

```
$ npm install
```

### gulp

```
$ gulp
```

監視が開始されます。

``gulpfile.js``に監視対象を記載しています。  
``gulp.task('watch', function(){}``内の必要無い部分はコメントアウトして下さい。  
``// gulp.watch(path, ['name'], function(event) {});``


### CSS
開発ディレクトリの``/frontend-dev-env/assets/sass/style.scss``をエディター等で保存すると、  
下記2ファイルが生成されます。  

``/www/assets/css/style.css``  
``/www/assets/css/style.min.css``  

gulp-autoprefixerで自動でプレフィックスが付与されます  

* モバイルサイトや管理画面別を分けて開発する際は、  
  ``gulpfile.js``の ``gulp.task('sass'`` をコピーして、``gulp.dest`` のパスを admin や mobile を指定します。

### JavaScript
ECMAScript 2015~が使用可能です。  
開発ディレクトリの``/frontend-dev-env/assets/js/app.js``をエディター等で保存すると、webpackがECMAScript 5へ変換、圧縮ファイルも生成します。  
下記2ファイルが生成されます。  

``/www/assets/js/bundle/app.js``  
``/www/assets/js/bundle/app.min.js``  

ECMAScript 6で記述したいファイルを追加したい場合は、``webpack.config.js``の``entry``に  

```
  entry: {
    app: '../www/assets/js/app.js',
    hoge: '../www/assets/js/hoge.js',
  },
```

上記の様に``hoge: '../www/assets/js/hoge.js',``とjsファイル名の名前とパスを追加してください。  
app.jsと同じ様に/bundle/内にhoge.min.jsも生成されます。  

#### Karma を初期化
```
$ node_modules/karma/bin/karma init
```


## Install
``$ git clone https://github.com/sc-ariman/frontend-dev-env.git ``


## Licence

[MIT](https://github.com/sc-ariman/tool/blob/master/LICENSE)

## Author

[@arima7th](http://twitter.com/arima7th)