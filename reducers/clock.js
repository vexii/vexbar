import {Map} from "immutable";
const clockActions = require("./../actions/clock")

const initialState = Map({
  time: new Date(),
})

function clock(state = initialState, action) {
  switch (action.type)
  case clockActions.UPDATE_CLOCK:
    return state.set("time", new Date());
  default:
    return state;
}

module.exports = clock;
