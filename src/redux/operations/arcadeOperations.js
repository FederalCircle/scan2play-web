import { arcadeActions } from '../actions'
import { arcadesRef } from '../../lib/firebase'

export const insertCoin = () => (dispatch) => {
  arcadesRef
    .child('clientTimestamp')
    .set(Date.now())
}

/**
 * Connects the redux store with the firebase reference. A listener will
 * dispatch a sync action on each firebase update.
 *
 * @returns {Function} Disconnect function used to remove firebase liestener.
 */
export const connectArcade = () => (dispatch) => {
  const callback = (snapshot) => {
    const payload = snapshot.val
    dispatch(
      arcadeActions.syncFirebase(payload)
    )
  }

  arcadesRef.on('value', callback)

  return {
    disconnect: () => arcadesRef.off('value', callback)
  }
}
