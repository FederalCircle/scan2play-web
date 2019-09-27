import { arcadeActions } from '../actions'
import { arcadesRef } from '../../lib/firebase'

export const insertCoin = () => async (dispatch) => {
  const snapshot = await arcadesRef
    .child('coins')
    .once('value')

  const coins = snapshot.val()

  console.log('coins', coins)
  if (coins > 0) {
    arcadesRef
      .child('clientTimestamp')
      .set(Date.now())
    arcadesRef
      .child('coins')
      .set(coins - 1)
    return Promise.resolve()
  } else {
    return Promise.reject('NO_COINS')
  }
}

/**
 * Connects the redux store with the firebase reference. A listener will
 * dispatch a sync action on each firebase update.
 *
 * @returns {Function} Disconnect function used to remove firebase liestener.
 */
export const connectArcade = () => (dispatch) => {
  const callback = (snapshot) => {
    const payload = snapshot.val()
    dispatch(
      arcadeActions.syncFirebase(payload)
    )
  }

  arcadesRef.on('value', callback)

  return {
    disconnect: () => arcadesRef.off('value', callback)
  }
}
