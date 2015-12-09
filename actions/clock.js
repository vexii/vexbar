const UPDATE_CLOCK = "UPDATE_CLOCK";

function updateClock(time) {
  return {
    type: UPDATE_CLOCK,
    time
  }
}

module.exports = {
  UPDATE_CLOCK,
  updateClock,
}
