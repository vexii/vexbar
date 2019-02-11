const actions = require("./actions");
const initialState = "";

module.exports = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.UPDATE_TITLE:
      return payload.title
    default:
      return state;
  }
}
