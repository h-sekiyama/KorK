import { Template } from 'meteor/templating';
import './main.html';

var userAgent = window.navigator.userAgent.toLowerCase();
var who = '';
// alert(userAgent);
if(userAgent.indexOf('iphone') == -1) {
  who = 'mitchan';
} else {
  who = 'yucco';
}

//今日の日付データを変数hidukeに格納
var hiduke=new Date(); 

//年・月・日・曜日を取得する
var year = hiduke.getFullYear();
var month = hiduke.getMonth()+1;
var day = hiduke.getDate();


Template.kashiwa.onCreated(function kashiwaOnCreated() {
  var db = firebase.database();
  var myDB = db.ref("/Data/mitchan");
  myDB.on("value", function(snapshot) {
    if(snapshot.val()['place'] != null) {
      $('#mitchan').html(snapshot.val()['place']);
    }
  })
});

Template.kashiwa.onCreated(function kashiwaOnCreated() {
  var db = firebase.database();
  var myDB = db.ref("/Data/yucco");
  myDB.on("value", function(snapshot) {
    if(snapshot.val()['place'] != null) {
      $('#yucco').html(snapshot.val()['place']);
    }
  })
});

// Template.kashiwa.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });

Template.kashiwa.events({
  'click button'(event, instance) {
    var db = firebase.database();
    var myDB = db.ref("/Data/" + who);
    alert(who + "は柏！");
    $('#' + who).html("柏");
    myDB.update({date: year + "/" + month + "/" + day, place: "柏"});
  },
});

Template.komagome.events({
  'click button'(event, instance) {
    var db = firebase.database();
    var myDB = db.ref("/Data/" + who);
    alert(who + "は駒込！");
    $('#' + who).html("駒込");
    myDB.update({date: year + "/" + month + "/" + day, place: "駒込"});
  },
});