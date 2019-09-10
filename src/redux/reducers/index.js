import { combineReducers } from 'redux'

import app from './appReducer'
import arcade from './arcadeReducer'

const rootReducer = combineReducers({
  app,
  arcade,
})

export default rootReducer