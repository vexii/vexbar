// @flow strict

import {
  combineReducers,
  createStore,
  type Store,
} from 'redux'

export const store: Store<Function, { type:string } > = createStore(
  state => state,
  {},
)

const reducerMap = {}
export function registerReducer(name: string, reducer: Function) {
  if (reducerMap[name] && reducerMap[name] === reducer) {
    return
  }
  reducerMap[name] = reducer
  store.replaceReducer(combineReducers(reducerMap))
}
