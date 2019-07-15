#!/usr/bin/node
// @flow

import * as React from 'react'
import { Provider } from 'react-redux'
import render from 'render'
import Clock from 'modules/clock'
import Title from 'modules/title'
import Battery from 'modules/battery'
import Lemonbar from 'lemonbar'
import Wifi from 'modules/wifi'
import Gpmd from 'modules/gpmd'
import { store } from 'store'
import { name } from '../package.json'

process.title = name

function Statusbar() {
  return (
    <Provider store={store}>
      <monitor name="portrait" possition={1}>
        <left>
          <Battery />
          <Wifi />
        </left>
        <center>
          <Title />
        </center>
        <right>
          <Clock dateFormat="HH:mm" />
        </right>
      </monitor>
    </Provider>
  )
}

render(
  <Statusbar />,
  Lemonbar({
    font: 'xft:Source Code Pro:style=Mono:size=20',
    fontColor: '#d0d0d0',
    barColor: '#3a3a3a',
  }),
)
