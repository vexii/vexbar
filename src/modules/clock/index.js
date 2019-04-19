// @flow
import * as React from 'react'
import reducer from './reducer'
import { connect } from 'react-redux'
import actions from './actions'
import { format } from 'date-fns'
import {
  dispatch,
  registerReducer
} from 'store'


function Clock({ clock }) {
  const [dateFormat, setDateFormat] = React.useState('HH:mm')
  return (
    <text fcolor="#f765b8" onClick={() => setDateFormat('Mo MMM')}>
      {format(clock, dateFormat)} 
    </text>
  )
}

registerReducer('clock', reducer)

setInterval(() => {
  dispatch(actions.update(new Date()))
}, 1000)

export default connect(state => state)(Clock)
