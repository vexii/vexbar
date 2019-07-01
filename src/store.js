// @flow strict
import {
  combineReducers,
  createStore,
  type Store,
} from 'redux'

const store: Store<Function, { type:string } > = createStore(
  state => state,
  {},
)


const reducerMap = {}
function registerReducer(name: string, reducer: Function) {
  if (reducerMap[name] && reducerMap[name] === reducer) {
    return
  }
  reducerMap[name] = reducer
  store.replaceReducer(combineReducers(reducerMap))
}

module.exports = {
  registerReducer,
  store,
  dispatch: store.dispatch,
}
