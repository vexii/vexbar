// @flow
import * as React from 'react'
import { spawn } from 'child_process'
import useSpawn from 'hooks/useSpawn'

function Title() {
  const title = useSpawn('xtitle', [ "-s"])
  return (
    <color hex='#87afaf'>
      {title}
    </color>
  )
}

export default Title
