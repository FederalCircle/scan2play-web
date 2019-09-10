import { appActions } from '../actions'

const delay = (delay) => (
  new Promise((resolve) => (
    setTimeout(() => {
      resolve()
    }, delay)
  ))
)

export const incrementCount = () => async (dispatch) => {
  await delay(1000)
  dispatch(appActions.incrementCount())
}

export const decrementCount = () => async (dispatch) => {
  await delay(1000)
  dispatch(appActions.decrementCount())
}
