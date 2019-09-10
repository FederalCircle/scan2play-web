import { arcadeTypes } from '../types'

const arcadeReducer = (state = {}, action) => {
  switch (action.type) {
    case arcadeTypes.SYNC_FIREBASE:
      return action.payload
    default:
      return state
  }
}

export default arcadeReducer