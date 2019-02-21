// @flow
import * as React from 'react'
import useGpmd, { type GpmdState } from 'hooks/useGpmd'

function Gpmd() {
  const state: GpmdState = useGpmd();
  return (
    <color hex="#f765b8">
      {state.isPlaying ? state.trackName : ''}
    </color>
  )
}

export default Gpmd
