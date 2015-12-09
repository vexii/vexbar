const Map = require("immutable").Map;
const actions = require("./actions");
const initialState = Map({
  title: ""
});

module.exports = (state, action) => {
  state = state || initialState;
  switch (action.type) {
  case actions.UPDATE_TITLE: 
    return state.set("title", action.title);
  default:
    return state;
  }
}
