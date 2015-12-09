const UPDATE_CLOCK = "UPDATE_CLOCK";

module.exports = {
  UPDATE_CLOCK,
  updateClock: (time) => {
    return {
      type: UPDATE_CLOCK,
      time,
    };
  },
};
