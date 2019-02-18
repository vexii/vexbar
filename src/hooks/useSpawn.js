// @flow
import { spawn } from 'child_process'
import {
  useState,
  useEffect
} from 'react'

function useSpawn(processName: string, processArgs: string[]) {
  const [processValue, setProcessValue] = useState()

  useEffect(function() {
    const process = spawn(processName, processArgs)

    process.stdout.on('data', data => {
      setProcessValue(data.toString().replace(/\n|'/g, ''))
    })

    return () => (
      process.kill()
    )
  }, [ processName, processArgs ])

  return [ processValue ]
}

export default useSpawn
