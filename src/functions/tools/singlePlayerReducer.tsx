import { InitialStateType, Handlers } from '../../pages/singleplayer/SettingsPage'

export const singlePlayerReducer = (
  state: InitialStateType,
  action: { type: Handlers; value: any }
): InitialStateType => {
  switch (action.type) {
    case Handlers.NICKNAME_HANDLER:
      return { ...state, nickname: action.value }
    case Handlers.TIMER_HANDLER:
      return { ...state, timer: action.value }
    case Handlers.QUANTITY_HANDLER:
      return { ...state, quantity: action.value }
    case Handlers.LEVEL_HANDLER:
      return { ...state, level: action.value }
    case Handlers.CREDENTIALS_HANDLER:
      return { ...state, credentials: action.value }
    case Handlers.SET_ERROR_HANDLER:
      return { ...state, error: action.value }
    case Handlers.CLEAR_ERROR_HANDLER:
      return { ...state, error: action.value }
    default:
      return state
  }
}
