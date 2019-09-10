import { combineReducers } from 'redux'

import { appTypes } from '../types'

const countReducer = (state = 0, action) => {
  switch (action.type) {
    case appTypes.INCREMENT_COUNT:
      return state + 1
    case appTypes.DECREMENT_COUNT:
      return state - 1
    default:
      return state
  }
}

const appReducer = combineReducers({
  count: countReducer,
})

export default appReducer