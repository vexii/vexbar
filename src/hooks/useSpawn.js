// @flow
import { spawn } from 'child_process'
import {
  useState,
  useEffect
} from 'react'

function useSpawn(processName: string, processArgs: string[]) {

  const [processValue, setProcessValue] = useState('')
  useEffect(function() {
    const process = spawn(processName, processArgs)

    process.stdout.on('data', data => {
      const lines = data.toString().split(/\n|'/g)
      setProcessValue(lines)
    })

    return () => (
      process.kill()
    )
  }, [])
  return processValue
}

export default useSpawn
