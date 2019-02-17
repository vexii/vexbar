#!/usr/bin/node
"use strict";
// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { store } from 'store'
import { render } from 'render'
import { Clock, init } from 'modules/clock'
import { Title, init as titleInit } from 'modules/title'
import container from 'lemonbar'


init('HH:mm');
titleInit()

function Statusbar({ monitors }) {
  return (
    <Provider store={store}>
        <monitor name="portrait" possition={0}>
          <center>
            <Title />
          </center>
          <right>
            <Clock />
          </right>
        </monitor>
    </Provider>
  )
}

render(
  <Statusbar monitors={['portrait', 'laptop']} />,
  container.init({
    fontColor: "#d0d0d0",
    barColor: "#3a3a3a",
  })
)
