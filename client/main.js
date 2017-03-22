import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

var db = firebase.database();
var myChatAll = db.ref("/Data");

import './main.html';

//今日の日付データを変数hidukeに格納
var hiduke=new Date(); 

//年・月・日・曜日を取得する
var year = hiduke.getFullYear();
var month = hiduke.getMonth()+1;
var day = hiduke.getDate();


// Template.kashiwa.onCreated(function kashiwaOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

// Template.kashiwa.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });

// Template.kashiwa.events({
//   // 'click button'(event, instance) {
//   //   increment the counter when button is clicked
//   //   instance.counter.set(instance.counter.get() + 1);
//   //   alert("柏！");
//   //   $('#mithcan').html("柏");
//   //   myChatAll.set({date: year + "/" + month + "/" + day, place: "柏", who: "みっちゃん"});
//   // },
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });

$("body").on("touchstart", "#kashiwa_btn", function() {
  alert("柏！");
  $('#mithcan').html("柏");
  myChatAll.set({date: year + "/" + month + "/" + day, place: "柏", who: "みっちゃん"});
})

$("body").on("touchstart", "#komagome_btn", function() {
    alert("駒込！");
    $('#mithcan').html("駒込");
    myChatAll.set({date: year + "/" + month + "/" + day, place: "駒込", who: "みっちゃん"});
})