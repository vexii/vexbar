const actions = require("./actions");
const initialState =  new Date();

module.exports = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.UPDATE_CLOCK:
      return payload.time;
    default:
      return state;
  }
}
