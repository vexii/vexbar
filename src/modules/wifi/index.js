// @flow
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
      return 
    } 
  }
}

registerReducer('wifi', reducer)

const wifiProcess = spawn('essid', [
  '-sw', 'wlp3s0',
])
