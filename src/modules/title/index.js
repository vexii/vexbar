// @flow
import * as React from 'react'
import { spawn } from 'child_process'
import useSpawn from 'hooks/useSpawn'

function Title() {
  const title = useSpawn('xtitle', [ "-s"])[0]
  return (
    <text>
      {title}
    </text>
  )
}

export default Title
