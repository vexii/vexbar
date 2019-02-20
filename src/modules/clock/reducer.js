const actions = require("./actions");
const { format } = require("date-fns");
const initialState =  new Date()

module.exports = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLOCK_UPDATE:
      return payload.time;
    default:
      return state;
  }
}
