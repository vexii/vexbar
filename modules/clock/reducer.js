const Map = require("immutable").Map;
const actions = require("./actions");
const initialState = Map({
  time: new Date(),
});

module.exports = (state, action) => {
  state = state || initialState;
  switch (action.type) {
  case actions.UPDATE_CLOCK: 
    return state.set("time", action.time);
  default:
    return state;
  }
}
