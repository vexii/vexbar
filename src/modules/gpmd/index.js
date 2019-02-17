// @flow
import { spawn } from "child_process"
import { connect } from 'react-redux'
import {
  dispatch,
  registerReducer
} from 'store'

const initialState = {
  playing: Boolean,
}
