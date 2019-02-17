#!/usr/bin/node
"use strict";
// @flow
import * as React from 'react'
import { Provider } from 'react-redux'
import { store } from 'store'
import { render } from 'render'
import { Clock, init } from 'modules/clock'
import  Title from 'modules/title'
import Battery from 'modules/battery'
import Lemonbar from 'lemonbar'


init('HH:mm');

function Statusbar({ monitors }) {
  return (
    <Provider store={store}>
        <monitor name="portrait" possition={0}>
          <center>
            <Title />
          </center>
          <right>
            <Battery />
            <Clock />
          </right>
        </monitor>
    </Provider>
  )
}

render(
  <Statusbar monitors={['portrait', 'laptop']} />,
  Lemonbar({
    fontColor: "#d0d0d0",
    barColor: "#3a3a3a",
  })
)
