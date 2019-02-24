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
    <text fcolor="#f765b8">
      {isPlaying ? ' ' + artistName + trackName : ''}
    </text>
  )
}

export default Gpmd
