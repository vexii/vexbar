// @flow
import * as React from 'react'
import useGpmd, { type GpmdState } from 'hooks/useGpmd'

function Gpmd() {
  const {
    isPlaying,
    trackName,
    artistName,
  }: GpmdState = useGpmd();
  return (
    <color hex="#f765b8">
      {isPlaying ? ' ' + artistName + trackName : ''}
    </color>
  )
}

export default Gpmd
