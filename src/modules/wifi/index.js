// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { spawn } from 'child_process'
import {
  dispatch,
  registerReducer
} from 'store'

const WIFI_CHANGED: 'WIFI_CHANGED' = 'WIFI_CHANGED'
function updateWifi(wifiName) {
  return ({
    type: WIFI_CHANGED,
    payload: wifiName
  })
}

const initialState = ''

function reducer(state = initialState, { type, payload }) {
  switch(type) {
    case WIFI_CHANGED: {
      return payload
    } 
    default: {
      return state
    }
  }
}

registerReducer('wifi', reducer)

const wifiProcess = spawn('essid', [
  '-sw', 'wlp3s0',
])

wifiProcess.stdout.on('data', (data) => {
  const wifiName = data.toString().replace(/\n|'/g, '')
  dispatch(updateWifi(wifiName))
})

function Wifi({ wifi }) {
  if (!wifi) {
    return null
  }
  return (
    <text fcolor='#27fdf5'>
      online: {wifi} 
    </text>
  )
}

export default connect(state => state)(Wifi)
