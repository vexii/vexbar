const reducer = require("./reducer");
const actions = require("./actions");
const spawn = require("child_process").spawn;

module.exports = {
  reducer,
  init: (dispatch) => {
    titleProcess = spawn("xtitle", ["-sf '%s'"]);
    titleProcess.stdout.on("data", (data) => {
      const title = data.toString().replace(/\n|'/g, "");
      dispatch(actions.updateTitle(title));
    });
  },
};
