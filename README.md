フロントエンド開発環境の構築[Babel / Compass / Webpack / gulp]
====

# Overview
 - タスクを直列処理する
 - ScssはCompassで自動コンパイル
 - cssはAutoprefixerで自動でプレフィックスを付与
 - css/imageのデータ容量を圧縮する
 - BABELでJavaScriptをES6で記述も可能
 - ES6のビルドはwebpackでJavaScriptを管理
 - ES5にビルドしたjsファイルを圧縮

# Description
/
┣ /www                 - 公開ディレクトリ  
　　┣ /assets  
　　　　┣ /css  
　　　　┣ /js  
　　　　┣ /images  
　　　　┗ /sass  
　　　　　┗ /admin  
　　　　　┗ /mobile  
　　　　　┗ /page  
　　┗ index.html
┣ /frontend-web-dev    - 開発ディレクトリ  
　　┣ .bowerrc          - bowerのディレクトリを制御  
　　┣ .ruby-version     - 使用するrubyのバージョンを記載しています  
　　┣ config.rb         - compassの設定ファイル  
　　┣ gulpfile.js       - gulpの設定ファイル  
　　┣ package.json      - npmパッケージの設定ファイル  
　　┣ README.md  
　　┗ webpack.config.js  - webpackの設定ファイル  
  
各設定ファイルに``css``や``js``までのパスが書かれています。  
必要あれば変更して下さい。  

# Requirement
- [npm](https://www.npmjs.com)
	- [gulp](http://gulpjs.com/)
	- [webpack](https://webpack.github.io/)
	- [babel](https://babeljs.io/)
		- babel-core
		- babel-loader
- [bower](http://gulpjs.com/)
- Ruby plugins
	- [Compass](http://compass-style.org)
	- [Autoprefixer](https://github.com/ai/autoprefixer)

## gulp plugins
- babel-core
- babel-loader
- gulp
- gulp-compass
- gulp-autoprefixer
- gulp-cssmin
- gulp-imagemin
- gulp-jsmin
- gulp-notify
- gulp-plumber
- gulp-rename
- gulp-webpack
- path

## Usage
frontend-web-devを利用したい任意のディレクトリに、クローンしたディレクトリをコピーして移動します。

```
$ cd /Users/username/workspace/your-project/frontend-web-dev
```

gulpとpackage.json内の必要なプラグインをインストール

```
$ npm install -g
```

必要に応じてbowerもインストールします。

```
$ npm install -g bower
```

Ruby環境がない場合はrbenv等で環境を構築します。  
[Homebrewをインストール](http://brew.sh/index_ja.html)

```
$ brew update
$ brew install rbenv ruby-build

$ echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
 
$ source ~/.bash_profile
$ rbenv install 2.3.0
$ rbenv local 2.3.0
```


初期化

```
$ bower init
```

下記でパッケージを追加できます

```
$ bower install package-name --save-dev
```

パッケージをインストールすると``/www/assets/vendor/``にディレクトリが生成されます

### Ruby
Rubyはv2.3.0を使用します。Compass と Autoprefixer を使用します。  
``Compass`` と ``Autoprefixer`` をインストールします。

```
$ gem install compass
$ gem install autoprefixer-rails
$ gem install csso-rails
```

### gulp

```
$ gulp
```

監視が開始されます。

``gulpfile.js``に監視対象を記載しています。  
``gulp.task('watch', function(){}``内の必要無い部分はコメントアウトして下さい。  
``// gulp.watch(path, ['name'], function(event) {});``


### css
``/www/assets/sass/style.scss``をエディター等で保存すると、  
下記2ファイルが生成されます。  

``/www/assets/css/style.css``  
``/www/assets/css/style.min.css``  

Autoprefixerで自動でプレフィックスが付与されます  

* モバイルサイトや管理画面別を分けて開発する際は、  
  ``gulpfile.js``のcompassAdmin や compassMb のコメントアウトを外し、  
  config.admin.rb や config.mobile.rb 等のファイルを作成し、それぞれパスを指定します。

### javascript
ECMAScript 6が使用可能です。  
``/www/assets/js/app.js``をエディター等で保存すると、webpackで結合しECMAScript 5へ変換、圧縮ファイルも生成します。  
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


### images
``/frontend-web-dev/images/``ディレクトリ内に画像を入れると、  
``/www/assets/images/``内に圧縮された同名のファイルも生成されます。


## Install
``$ git clone https://bitbucket.org/RyogaArima/frontend-web-dev ``


## Licence

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)

## Author

[@arima7th](http://twitter.com/arima7th)