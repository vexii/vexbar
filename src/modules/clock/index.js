// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import {
  store,
  registerReducer,
} from 'store'
import actions from './actions'
import reducer from './reducer'


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
  store.dispatch(actions.update(new Date()))
}, 1000)

export default connect(state => state)(Clock)
