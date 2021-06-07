interface HostPageInitialStateType {
  display: {
    message: string
    header: string
    roomId: string
  }
  alert: {
    type: undefined | 'info' | 'success' | 'error' | 'warning'
    status: boolean
    title: string
    message: string
  }
  shouldGo: boolean
  localStorageAlert: boolean
  mode: number
}

export const initialState: HostPageInitialStateType = {
  display: {
    message: 'Please wait...',
    header: 'Room: ',
    roomId: 'will be created soon...'
  },
  alert: {
    type: undefined,
    status: false,
    title: '',
    message: ''
  },
  shouldGo: false,
  localStorageAlert: false,
  mode: 0
}

export enum Handlers {
  ALERT_HANDLER = 'ALERT_HANDLER',
  DISPLAY_HANDLER = 'DISPLAY_HANDLER',
  SET_MODE_HANDLER = 'SET_MODE_HANDLER',
  RECOVERY_HANDLER = 'RECOVERY_HANDLER',
  RECOVERY_SUCCESS_HANDLER = 'RECOVERY_SUCCESS_HANDLER',
  FETCHED_DATA_HANDLER = 'FETCHED_DATA_HANDLER'
}

type Action =
  | {
      type: Handlers.ALERT_HANDLER
      value: {
        type: undefined | 'info' | 'success' | 'error' | 'warning'
        status: boolean
        title: string
        message: string
      }
    }
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

export const hostPageReducer = (
  state: HostPageInitialStateType,
  action: Action
): HostPageInitialStateType => {
  switch (action.type) {
    case Handlers.ALERT_HANDLER:
      return { ...state, alert: action.value }
    case Handlers.DISPLAY_HANDLER:
      return { ...state, display: action.value }
    case Handlers.SET_MODE_HANDLER:
      return { ...state, mode: action.value }
    case Handlers.RECOVERY_HANDLER:
      return { ...state, localStorageAlert: action.value }
    case Handlers.RECOVERY_SUCCESS_HANDLER:
      return {
        ...state,
        display: action.value.display,
        localStorageAlert: action.value.localStorageAlert,
        shouldGo: action.value.shouldGo,
        mode: action.value.mode
      }
    case Handlers.FETCHED_DATA_HANDLER:
      return {
        ...state,
        display: action.value.display,
        shouldGo: action.value.shouldGo
      }
    default:
      return state
  }
}
