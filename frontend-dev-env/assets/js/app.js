import Sample from './modules/sample';
// import jquery from '../vendor/jquery/dist/jquery.min.js';

class Hoge extends Sample {
  constructor (name) {
    super(name);
  }
  callName () {
    alert(this.name);
  }
}

var hoge = new Hoge('fuga');
hoge.callName();
