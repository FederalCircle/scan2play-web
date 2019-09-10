import * as types from '../types/arcadeTypes'

export const syncFirebase = payload => ({
  type: types.SYNC_FIREBASE,
  payload,
})
