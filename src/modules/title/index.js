// @flow
import reducer from "./reducer"
import actions from "./actions"
import { spawn } from "child_process"
import {
  dispatch,
  registerReducer
} from 'store'

module.exports = {
  init: () => {
    registerReducer('title', reducer);
    const titleProcess = spawn("xtitle", ["-sf '%s'"]);
    titleProcess.stdout.on("data", (data) => {
      const title = data.toString().replace(/\n|'/g, "");
      dispatch(actions.updateTitle(title));
    });
  },
};
