// @flow
import {
  combineReducers,
  createStore,
  applyMiddleware,
  type Store,
} from 'redux'

const log = ({ getState }) => next => action => {
  const result = next(action);
  console.log("action", action);
  console.log("new state", getState());

  return result;
};

const store: Store<Function, { type:string } > = createStore(
  state => state,
  {},
);


const reducerMap = {};
function registerReducer(name: string, reducer: Function) {
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
