// @flow
import * as React from 'react'
import { spawn } from "child_process"
import { connect } from 'react-redux'
import {
  dispatch,
  registerReducer
} from 'store'
import Websocket from 'ws'

type GpmdState = {
  isPlaying: boolean,
  trackName: string,
  artistName: string
}

const PLAYSTATE_CHANGE: 'PLAYSTATE_CHANGE' = 'PLAYSTATE_CHANGE'
const TRACK_CHANGE: 'TRACK_CHANGE' = 'TRACK_CHANGE'

function playStateChange(isPlaying: boolean) {
  return ({
    type: PLAYSTATE_CHANGE,
    payload: isPlaying,
  })
}

function trackChange(trackName: string) { 
  return ({
    type: TRACK_CHANGE,
    payload: trackName
  })
}

const initialState = {
  isPlaying: false,
  trackName: "",
  artistName: ""
}

function reducer(state = initialState, { type, payload}) {
  switch(type) {
    case PLAYSTATE_CHANGE: {
      return {
        ...state,
        isPlaying: payload
      }
    }
    case TRACK_CHANGE: {
      return ({
        ...state,
        trackName: payload.title,
        artistName: payload.artist,
      })
    }
    default: {
      return state
    }
  }
}

registerReducer('gpmd', reducer)

const ws = new Websocket('ws://localhost:5672')
ws.on('message', (data) => {
  const { channel, payload } = JSON.parse(data)
  switch (channel) {
    case 'playState': {
      return dispatch(playStateChange(payload))
    } 
    case 'track': {
      return dispatch(trackChange(payload))
    }
  }
})

function Gpmd({ isPlaying, trackName, artistName }: GpmdState) {
  if (isPlaying && trackName && artistName) {
    return (
      <action>
        {artistName} - { trackName }
      </action>
      
    )
  }
  return null
}

export default connect(({ gpmd }) => gpmd)(Gpmd)
