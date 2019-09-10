import { arcadeActions } from '../actions'
import { arcadeRef } from '../../lib/firebase'

export const pushTest = () => (dispatch) => {
  arcadeRef.set({
    serverTimestamp: Date.now(),
    clientTimestamp: Date.now()
  })
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

  arcadeRef.on('value', callback)

  return {
    disconnect: () => arcadeRef.off('value', callback)
  }
}
