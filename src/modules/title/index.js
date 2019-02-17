// @flow
import reducer from "./reducer"
import actions from "./actions"
import { connect } from 'react-redux'
import { spawn } from "child_process"
import {
  dispatch,
  registerReducer
} from 'store'

function Title({ title }) {
  return (
    title
  )
}

module.exports = {
  Title: connect(state => state)(Title),
  init: () => {
    registerReducer('title', reducer);
    const titleProcess = spawn("xtitle", ["-sf '%s'"]);
    titleProcess.stdout.on("data", (data) => {
      const title = data.toString().replace(/\n|'/g, "");
      dispatch(actions.updateTitle(title));
    });
  },
};
