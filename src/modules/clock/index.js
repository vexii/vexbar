// @flow
import reducer from './reducer'
const { connect } = require('react-redux');
const actions = require("./actions");
const { format } = require("date-fns");
import {
  dispatch,
  registerReducer
} from 'store'

function Clock({ clock, title }) {
  console.log('time:', title)
  return (
    title
  )
}

module.exports = {
  Clock: connect(state => state)(Clock),
  reducer,
  init: (
    dateFormat: string
  ) => {
    registerReducer('clock', reducer);
    setInterval(() => {
      dispatch(actions.update(format(new Date(), dateFormat)));
    }, 1000);
  },
};
