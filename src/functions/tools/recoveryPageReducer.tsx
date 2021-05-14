import {
  RecoveryStateType,
  Handlers,
  initialState
} from '../../pages/singleplayer/RecoveryPage'

export type StorageData = {
  user: string
  gameSettings: {
    artificialGameId: string
    gameId: string
    message: string
    timer: number
  }
}

export type RecoveryDataType = {
  message: string
  nextQuestion: number
}

export const recoveryPageReducerFunction = (
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
      return { ...state, proceedGame: true, recoveredData: false, message: action.value }
    default:
      return initialState
  }
}
