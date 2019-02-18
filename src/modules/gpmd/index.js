// @flow
import { spawn } from "child_process"
import { connect } from 'react-redux'
import {
  dispatch,
  registerReducer
} from 'store'
import Websocket from 'ws'

const PLAYSTATE_CHANGE: 'PLAYSTATE_CHANGE' = 'PLAYSTATE_CHANGE'

function playStateChange(isPlaying: boolean) {
  return ({
    type: PLAYSTATE_CHANGE,
    payload: isPlaying,
  })
}

let connected = false;

const ws = new Websocket('ws://localhost:5672')
ws.on('open', (...args) => {
  connected = true;
})

ws.on('message', (data) => {
  const { channel, payload } = JSON.parse(data)
  switch (channel) {
    case 'playState': {
      return dispatch(playStateChange(payload))
    } 
  }
  if(channel === 'playState') {
    console.log(channel, payload)
  }
})

