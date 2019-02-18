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


function Clock({ clock, dateFormat }) {
  return (
    format(clock, dateFormat)
  )
}

registerReducer('clock', reducer);

setInterval(() => {
  dispatch(actions.update(new Date()))
}, 1000);

export default connect(state => state)(Clock)
