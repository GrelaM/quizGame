export interface RecoveryStateType {
  user: string
  artificialGameId: string
  gameId: string
  proceedGame: boolean
  isLoading: boolean
  recoveredData: boolean
  message: string
  toggleAlert: boolean
}

export interface LocalStorageType {
  user: string
  gameSettings: {
    artificialGameId: string
    gameId: string
    message: string
    timer: number
  }
}

export enum Handlers {
  PROCEED_GAME_HANDLER = 'PROCEED_GAME_HANDLER',
  RECOVERED_DATA_HANDLER = 'RECOVERED_DATA_HANDLER',
  TOGGLE_ALERT = 'TOGGLE_ALERT'
}

export const initialState: RecoveryStateType = {
  user: '',
  artificialGameId: '',
  gameId: '',
  proceedGame: false,
  isLoading: true,
  recoveredData: false,
  message: 'Please wait...',
  toggleAlert: false
}

export type Action =
  | {
      type: Handlers.RECOVERED_DATA_HANDLER
      value: LocalStorageType
    }
  | {
      type: Handlers.PROCEED_GAME_HANDLER
      value: string
    }
  | {
      type: Handlers.TOGGLE_ALERT
      value: boolean
    }

export const recoveryReducer = (
  state: RecoveryStateType,
  action: {
    type: Handlers
    value: any
  }
): RecoveryStateType => {
  switch (action.type) {
    case Handlers.RECOVERED_DATA_HANDLER:
      return {
        ...state,
        user: action.value.user,
        artificialGameId: action.value.gameSettings.artificialGameId,
        gameId: action.value.gameSettings.gameId,
        isLoading: false,
        recoveredData: true
      }
    case Handlers.PROCEED_GAME_HANDLER:
      return {
        ...state,
        proceedGame: true,
        recoveredData: false,
        message: action.value
      }
    case Handlers.TOGGLE_ALERT:
      return { ...state, toggleAlert: action.value }
    default:
      return initialState
  }
}
