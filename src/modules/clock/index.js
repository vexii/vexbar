const reducer = require("./reducer"); 
const actions = require("./actions");
const { format } = require("date-fns");
const {
  dispatch,
  registerReducer,
  runSaga
} = require('./../../store.js');
const {
  put,
  take,
  call
} = require("redux-saga/effects");


function* updateClock() {
  console.log(':o')
  const runner = yield call(setInterval(() => {
    put(actions.update(format(new Date(), 'HH:mm')))
  },1000))
  yield runner;
}

function* watchClock() {
  console.log('??????????????????')
  take({
    type: actions.CLOCK_START
  }, updateClock)
}

runSaga(watchClock)
registerReducer('clock', reducer);
module.exports = {
  reducer,
  init: ({
    dateFormat
  }) => {
    dispatch(actions.start())
  },
};
