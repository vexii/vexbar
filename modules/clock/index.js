const moment = require("moment");
const reducer = require("./reducer"); 
const actions = require("./actions");

module.exports = {
  reducer,
  init: (dispatch) => {
    setInterval(() => {
      const time = moment().format("HH:mm");
      dispatch(actions.updateClock(time));
    }, 1000);
  },
};
