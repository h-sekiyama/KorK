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

// 年・月・日・時間を取得する
var year = hiduke.getFullYear();
var month = hiduke.getMonth()+1;
var day = hiduke.getDate();
var hour = hiduke.getHours();

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
    cordova.plugins.notification.local.schedule({
      id: 2,
      text: who + 'は駒込に帰る'
    });
  },
});

Template.komagome.events({
  'click button'(event, instance) {
    var db = firebase.database();
    var myDB = db.ref("/Data/" + who);
    alert(who + "は駒込！");
    $('#' + who).html("駒込");
    myDB.update({date: year + "/" + month + "/" + day, place: "駒込"});
    cordova.plugins.notification.local.schedule({
      id: 3,
      text: who + 'は駒込に帰る'
    });
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

}

/**
  ローカル通知（iPhoneの場合は許可が必要）
**/
scheduleMinutely = function () {
  var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';
  cordova.plugins.notification.local.schedule({
    id: 1,
    text: '愚か者！どっちに帰るのかちゃんと連絡しろ！',
    firstAt: at_8_pm,
    every: 'day',
    sound: sound
  });
};

/**
  端末バックグラウンドに入った時に行うメソッド
**/
if(typeof device === 'undefined'){
  document.addEventListener("pause", onPause, false);
}else{
  onPause();
}
function onPause() {
  cordova.plugins.notification.local.hasPermission(function(granted){
    if(granted == true) {
      scheduleMinutely();
    } else {
      cordova.plugins.notification.local.registerPermission(function(granted) {
        if(granted == true) {
          scheduleMinutely();
        } else {
          navigator.notification.alert("通知を許可してくれ！");
        }
      });
    }
  });
}

/**
  端末がバックグラウンドから復帰した時のメソッド
**/
document.addEventListener("resume", onResume, false);
function onResume() {
  // ちゃんと連絡したら通知処理をキャンセルする
  var db = firebase.database();
  var myDB = db.ref("/Data/" + who);
  myDB.on("value", function(snapshot) {
    if((snapshot.val()['date'] != year + "/" + month + "/" + day)) {
      cordova.plugins.notification.local.cancelAll();
    }
  });
}
