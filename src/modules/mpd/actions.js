const MPD_CONNECTED = "MPD_CONNECTED";
const MPD_DISCONNECTED = "MPD_DISCONNECTED";
const MPD_PLAYER_PAUSE = "MPD_PLAYER_PAUSE";
const MPD_PLAYER_START = "MPD_PLAYER_START";
const MPD_PLAYER_STOP = "MPD_PLAYER_STOP";
const MPD_TRACK_SWITCH = "MPD_TRACK_SWITCH";
const MPD_VOLUME_CHANGE = "MPD_VOLUME_CHANGE";

module.exports = {
  MPD_CONNECTED,
  MPD_PLAYER_PAUSE,
  MPD_PLAYER_START,
  MPD_PLAYER_STOP,
  MPD_PLAY_CHANGE,
  MPD_TRACK_SWITCH,
  MPD_VOLUME_CHANGE,
  changeVolume: (volume) => {
    return {
      action: MPD_VOLUME_CHANGE,
      volume,
    }
  },
  connected: () => {
    return {
      action: MPD_CONNECTED,
    };
  },
  disconnected: () => {
    return {
      action: MPD_DISCONNECTED,
    };
  },
  startPlayer: () => {
    return {
      action: MPD_PLAYER_START,
    };
  },
  stopPlayer: () => {
    return {
      action: MPD_PLAYER_STOP,
    };
  },
  pausePlayer: () => {
    return {
      action: MPD_PLAYER_PAUSE,
    };
  },
  switchTrack: (track) => {
    return {
      action: MPD_PLAY_CHANGE,
      track,
    };
  },
};
