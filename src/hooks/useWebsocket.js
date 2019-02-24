// @flow
import {
  useEffect,
  useState,
} from 'react'
import Websocket from 'ws'

function useWebsocket(
  address: string,
) {

  const ws = new Websocket(address)
  const [ message, setMessage ] = useState({})
  const [ isConnected, setConnected ] = useState(false)

  useEffect(function() {

    ws.on('open', () => {
      setConnected(true)
    })

    ws.on('message', setMessage)

    return function() {
      if(ws) {
        ws.terminate()
      }
    }
  }, [ ])

  if(isConnected) {
    return [ isConnected, message, ws.send.bind(ws) ]
  }

  return [ isConnected, message ]
} 

export default useWebsocket
