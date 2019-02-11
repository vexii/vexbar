#!/usr/bin/node
// @flow
"use strict";
const { store } = require("./src/store");
const clock = require("./src/modules/clock");
const title = require("./src/modules/title");
const bar = require('./src/lemonbar');

const { write } = bar.init({
  fontColor: "#d0d0d0",
  barColor: "#3a3a3a",
  format: function({ title, clock }) {
    return `%{S0}%{r}${clock}%{S1}%{c}${title}%{r}%{A1:reboot:} reboot %{A}${clock}`;
  }
});

title.init();

store.subscribe(() => write(store.getState()) );
