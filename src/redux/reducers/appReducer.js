import { appTypes } from '../types'

const appReducer = (state = 0, action) => {
  switch (action.type) {
    case appTypes.INCREMENT_COUNT:
      return state + 1
    case appTypes.DECREMENT_COUNT:
      return state - 1
    default:
      return state
  }
}

export default appReducer