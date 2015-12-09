const Map = require("immutable").Map;
const mpdActions = require("./actions");
const initialState = Map({
  connected: false,
  playing: false,
  paused: false,
  track: "",
  volume: 0,
});

module.exports = function(state, action) {
  state = state || initialState;
  switch (action.type) {
    case actions.MPD_CONNECTED:
      return state.set("connected", true);
    case actions.MPD_DISCONNECTED:
      return state.set("connected", false);
    case actions.MPD_TRACK_SWITCH:
      return state.set("track", action.track);
  }
};
