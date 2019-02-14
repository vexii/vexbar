import {
  combineReducers,
  createStore,
  applyMiddleware,
} from 'redux'

const log = ({ getState }) => next => action => {
  const result = next(action);
  console.log("action", action);
  console.log("new state", getState());

  return result;
};

const store = createStore(
  state => state,
  {},
  applyMiddleware(log)
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
};
