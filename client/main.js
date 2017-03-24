import _ from 'underscore';
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

// 今日の日付データを変数hidukeに格納
var hiduke=new Date(); 

// 年・月・日・曜日を取得する
var year = hiduke.getFullYear();
var month = hiduke.getMonth()+1;
var day = hiduke.getDate();

// 帰宅先情報表示
_.each(['mitchan', 'yucco'], function(who) {
  Template.kashiwa.onCreated(function kashiwaOnCreated() {
    var db = firebase.database();
    var myDB = db.ref("/Data/" + who);
    myDB.on("value", function(snapshot) {
      if(snapshot.val()['date'] == year + "/" + month + "/" + day ) {
        $('#' + who).html(snapshot.val()['place']);
      } else {
        $('#' + who).html('愚か者');
      }
    })
  });
});

// 各ボタンタップ時の挙動
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

/**
  端末の準備を待つメソッド
**/
if(typeof device === 'undefined'){
  document.addEventListener("deviceready", onDeviceReady, false);
}else{
  onDeviceReady();
}

function onDeviceReady() {
  // navigator.vibrate([1000, 1000, 3000, 1000, 5000]);

}

/**
  端末バックグラウンドに入った時に行うメソッド
**/
if(typeof device === 'undefined'){
  document.addEventListener("pause", onPause, false);
}else{
  onPause();
}

function onPause() {
  var intervalId = setInterval(function() {
    var db = firebase.database();
    var myDB = db.ref("/Data/" + who);
    myDB.on("value", function(snapshot) {
      if(snapshot.val()['date'] != year + "/" + month + "/" + day ) {
        navigator.vibrate(200);
      }
    })
  }, 10000);
}