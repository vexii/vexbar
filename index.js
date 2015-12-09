#!/usr/bin/node
"use strict";
const spawn = require("child_process").spawn;
const combineReducers = require("redux").combineReducers;
const createStore = require("redux").createStore;
const clock = require("./modules/clock");
const title = require("./modules/title");

const store = createStore(combineReducers({
  clock: clock.reducer,
  title: title.reducer,
}));
const bar = spawn("lemonbar", [
    "-n", "piebar",
    "-F", "#FF3497DB",
    "-B", "#FF5AABE3",
    "-g", "x18",
    "-f", "xft:Source Code Pro:style=Mono:size=11",
]);
const write = (state) => {
  const clock = state.clock;
  const title = state.title;
  const line = `%{c}${title.get("title")}%{r}${clock.get("time")} \n`;
  bar.stdin.write(line);
};

clock.init(store.dispatch);
title.init(store.dispatch);

write(store.getState());
store.subscribe(() => write(store.getState()) );



/*
var xtitleProcess = spawn("xtitle", ["-sf '%s'"]);
var title = "";
var clockProcess = spawn("clock", ["-sf '%a %H:%M'"]);
var clock = "";
var bspcProcess= spawn("bspc", ["control", "--subscribe"]);

var mpd = require("mpd")
  , mpdCmd = mpd.cmd
  , client = mpd.connect({
    port: 6600,
    host: "localhost",
  })
;

client.on("ready", function() {
  client.sendCommand(mpdCmd("status", []), function(err, data) {
    if(err) {
      throw err
    }
    console.log(data);
  });
});
client.on("system-player", (name) => {
  client.sendCommand(mpdCmd("status", []), function(err, data) {
    if(err) {
      throw err
    }
    console.log(data);
  });
});
client.on("system", (name) => {
  console.log(name);
});

process.on("exit", (code) => {
  bar.kill();
  xtitle.kill();
  clock.kill();
  bspcProcess.kill();
});

bar.stdin.setEncoding("utf-8");

xtitleProcess.stdout.on("data", (data) => {
  title = data.toString().replace(/\n|'/g, "");
  writeLine();
});

clockProcess.stdout.on("data", (data) => {
  clock = data.toString().replace(/\n|'/g, "");
  writeLine();
});

bspcProcess.stdout.on("data", (data) => {
  return;
  const getChunck = getChunckFactory(data.toString());
  let temp = "";
  console.log((temp = getChunck() && !!temp), temp, "orginal:", data.toString());
  while((temp = getChunck() || !!temp)) {
    console.log(temp);
  }
});

function getChunckFactory(str) {
  return function getChunck() {
    const index = str.indexOf(":");
    let newStr;
    if (index) {
      newStr = str.slice(0, index);
      str = str.slice(str.indexOf(":")+1);
      return newStr || false;
    } else {
      return; 
    }
  };
}

function writeLine() {
  const line = `%{c}${title}%{r}${clock}\n`;
  bar.stdin.write(line);
}
*/
