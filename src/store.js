const {
  combineReducers,
  createStore,
  applyMiddleware,
} = require("redux");

const createSagaMiddleware = require('redux-saga').default

const sagaMiddleware = createSagaMiddleware()

const log = ({ getState }) => next => action => {
  const oldstate = getState();
  const result = next(action);
  console.log("action", action);
  console.log("new state", getState());

  return result;
};

const store = createStore(
  state => state,
  {},
  applyMiddleware(log, sagaMiddleware)
);


const reducerMap = {};
function registerReducer(name, reducer) {
  if (reducerMap[name] && reducerMap[name] === reducer) {
    return;
  }
  reducerMap[name] = reducer;
  store.replaceReducer(combineReducers(reducerMap));
};

module.exports = {
  registerReducer,
  store,
  dispatch: store.dispatch,
  runSaga: sagaMiddleware.run,
};
