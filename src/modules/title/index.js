// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { spawn } from 'child_process'
import {
  dispatch,
  registerReducer
} from 'store'

const UPDATE_TITLE: 'UPDATE_TITLE' = 'UPDATE_TITLE'
function updateTitle(title) {
  return ({
    type: UPDATE_TITLE,
    payload: title
  })
}

const initialState = ''
function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_TITLE: {
      return payload
    } 
    default: {
      return state
    }
  }
}

registerReducer('title', reducer);
const titleProcess = spawn("xtitle", [
"-sf '%s'"
]);

titleProcess.stdout.on("data", (data) => {
  const title = data.toString().replace(/\n|'/g, "");
  dispatch(updateTitle(title));
});

function Title({ title }) {
  return (
    <color hex='#87afaf'>
      {title}
    </color>
  )
}

export default connect(state => state)(Title)
