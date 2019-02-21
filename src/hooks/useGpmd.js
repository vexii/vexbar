// @flow
import useWebsocket from 'hooks/useWebsocket'
import { useReducer, useEffect } from 'react'

export type GpmdState = {
  isPlaying: boolean,
  trackName: string,
  artistName: string
}

const initState = {
  isPlaying: false,
  trackName: '',
  artistName: '',
}

function reducer(state: GpmdState = initState, { type, payload }) {
  switch(type) {
    case 'playState':  return ({
      ...state,
      isPlaying: payload
    })

    case 'track': return ({
      ...state,
      trackName: payload.title,
      artistName: payload.artist,
    })
    default: return state 
  }
}

function useGpmd() {
  const [ isConnected, message, send ] = useWebsocket('ws://localhost:5672')
  const [ state: GpmdState, dispatch ] = useReducer(reducer, initState) 

  useEffect(() => {
    if(isConnected) {
      const { channel, payload } = JSON.parse(message)
      dispatch({
        type: channel,
        payload
      })
    }
  }, [ message ])

  return state
}

export default useGpmd
