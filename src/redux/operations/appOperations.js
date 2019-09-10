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
  console.log('foo')
}

export const decrementCount = () => async (dispatch) => {
  await delay(1000)
  dispatch(appActions.decrementCount())
}

export const connectTest = () => (dispatch) => {
  
}
