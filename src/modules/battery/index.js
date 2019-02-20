// @flow
import * as React from 'react'
import { spawn } from "child_process"
import { connect } from 'react-redux'
import {
  dispatch,
  registerReducer
} from 'store'

const BATTERY_STATE_CHANGE: 'BATTERY_STATE_CHANGE' = 'BATTERY_STATE_CHANGE'

type BatteryState = {
  state: 'Charging' | 'Discharging' | 'Unknown' | 'Full',
  charge: number,
}

const initialState: BatteryState = {
  state: 'Unknown',
  charge: 0,
}

function batteryStateChange(
  state: 'Charging' | 'Discharging' | 'Unknown' | 'Full',
  charge: number,
) {
  return ({
    type: BATTERY_STATE_CHANGE,
    payload: { state, charge }
  })
}

function reducer(
  state: BatteryState = initialState,
  {type, payload}
): BatteryState {
  switch(type) {
    case BATTERY_STATE_CHANGE: {
      return payload
    } 
    default: {
      return state
    }
  }
}

registerReducer('battery', reducer)
const watchProcess = spawn('battery', ['-sn1'])
watchProcess.stdout.on("data", (data) => {
  const [state, charge] = data.toString().replace(/\n|'/g, "").split(' ')
  dispatch(batteryStateChange(state, charge))
})

function Battery({ state, charge, onClick }) {
  return (
    <color hex={charge > 30 ? '#ffafaf' : '#d0d0d0'}>
      {state !== 'Unknown' && `${state}:`} {charge}%
    </color>
  )
}
export default connect(({ battery }) => battery)(Battery)
