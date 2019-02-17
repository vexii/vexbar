// @flow
import reducer from './reducer'
import { connect } from 'react-redux'
import actions from './actions'
import { format } from 'date-fns'
import {
  dispatch,
  registerReducer
} from 'store'

function Clock({ clock }) {

  return (
    clock
  )
}

module.exports = {
  Clock: connect(state => state)(Clock),
  init: (
    dateFormat: string
  ) => {
    registerReducer('clock', reducer);
    setInterval(() => {
      dispatch(actions.update(format(new Date(), dateFormat)));
    }, 1000);
  },
};
