export interface InitialStateType {
  isLoading: boolean
  credentials: boolean
  toggleAlert: boolean
}

export enum Handlers {
  LOADER_HANDLER = 'LOADER_HANDLER',
  TOGGLE_ALERT_HANDLER = 'TOGGLE_ALERT_HANDLER',
  CREDENTIALS_HANDLER = 'CREDENTIALS_HANDLER'
}

export const initialState: InitialStateType = {
  isLoading: false,
  credentials: false,
  toggleAlert: false
}

export type Action =
  | {
      type: Handlers.CREDENTIALS_HANDLER
      value: boolean
    }
  | {
      type: Handlers.LOADER_HANDLER
      value: boolean
    }
  | {
      type: Handlers.TOGGLE_ALERT_HANDLER
      value: boolean
    }

export const singlePlayerReducer = (
  state: InitialStateType,
  action: Action
): InitialStateType => {
  switch (action.type) {
    case Handlers.CREDENTIALS_HANDLER:
      return { ...state, credentials: action.value }
    case Handlers.LOADER_HANDLER:
      return { ...state, isLoading: action.value }
    case Handlers.TOGGLE_ALERT_HANDLER:
      return { ...state, toggleAlert: action.value }
    default:
      return { ...state }
  }
}
