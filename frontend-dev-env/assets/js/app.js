import Sample from './modules/sample';
// import jquery from '../vendor/jquery/dist/jquery.min.js';

class Hoge extends Sample {
  callName () {
    console.log(this.name);
  }
}

var hoge = new Hoge('fuga');
hoge.callName();
