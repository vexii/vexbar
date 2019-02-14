const actions = require("./actions");
const { format } = require("date-fns");
const initialState =  format(new Date(), 'HH:mm:ss')

module.exports = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLOCK_UPDATE:
      return payload.time;
    default:
      return state;
  }
}
