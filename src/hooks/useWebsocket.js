// @flow
import {
  useReducer,
  useEffect,
  useState,
} from 'react'
import Websocket from 'ws'

function useWebsocket(
  address: string,
  connect: boolean = true
) {

  let ws
  const [ message, setMessage ] = useState({})
  const [ isConnected, setConnected ] = useState(false)

  useEffect(function() {

    if(connect && !isConnected) {
      ws = new Websocket(address)

      ws.on('open', () => {
        setConnected(true)
      })

      ws.on('message', setMessage)

    }

    return function() {
      if(ws) {
        ws.close()
      }
    }
  }, [ connect ])
  return [ isConnected, message ]
} 
