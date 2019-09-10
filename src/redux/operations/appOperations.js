import { appActions } from '../actions'
import { testRef } from '../../lib/firebase'

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

export const pushTest = () => (dispatch) => {
  testRef.push({ foo: 'bar' })
}

export const connectTest = () => (dispatch) => {
  const callback = (snapshot) => {
    console.log('Test snapshot:', snapshot.val())
  }

  testRef.on('value', callback)

  return {
    disconnect: () => testRef.off('value', callback)
  }
}
