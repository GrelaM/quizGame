import { Handlers } from './hostHandler'

export type Action =
  | {
      type: Handlers.DISPLAY_HANDLER
      value: {
        message: string
        header: string
        roomId: string
      }
    }
  | {
      type: Handlers.SET_MODE_HANDLER
      value: number
    }
  | {
      type: Handlers.RECOVERY_HANDLER
      value: boolean
    }
  | {
      type: Handlers.RECOVERY_SUCCESS_HANDLER
      value: {
        display: {
          message: string
          header: string
          roomId: string
        }
        shouldGo: boolean
        localStorageAlert: boolean
        mode: number
      }
    }
  | {
      type: Handlers.FETCHED_DATA_HANDLER
      value: {
        display: {
          message: 'Please wait...'
          header: 'Room: '
          roomId: 'will be created soon...'
        }
        shouldGo: boolean
      }
    }
