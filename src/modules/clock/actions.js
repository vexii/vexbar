// @flow
const CLOCK_START = 'CLOCK_START';
const CLOCK_STOP = 'CLOCK_STOP';
const CLOCK_UPDATE = "CLOCK_UPDATE";

module.exports = {
  CLOCK_START,
  CLOCK_STOP,
  CLOCK_UPDATE,

  start: () => ({
    type: CLOCK_START,
  }),

  stop: () => ({
    type: CLOCK_STOP,
  }),

  update: (time) => ({
      type: CLOCK_UPDATE,
      payload: {
        time
      }
  }),
};
