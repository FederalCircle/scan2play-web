import * as types from '../types/appTypes'

export const incrementCount = () => ({
  type: types.INCREMENT_COUNT,
})

export const decrementCount = () => ({
  type: types.DECREMENT_COUNT,
})
