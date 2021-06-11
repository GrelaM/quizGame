import { SettingsStateInterface } from '../../../constants/interface/settings/settingsState'
import { SettingsHandler as Handlers } from '../../../constants/interface/settings/settingsHandler'
import { Action } from '../../../constants/interface/settings/settingsAction'

export const settingsReducer = (
  state: SettingsStateInterface,
  action: Action
): SettingsStateInterface => {
  switch (action.type) {
    case Handlers.NICKNAME_HANDLER:
      return { ...state, nicknameInput: action.value }
    case Handlers.QUANTITY_HANDLER:
      return {
        ...state,
        gameSettings: {
          ...state.gameSettings,
          quantity: {
            ...state.gameSettings.quantity,
            currentState: action.value
          }
        }
      }
    case Handlers.TIME_HANDLER:
      return {
        ...state,
        gameSettings: {
          ...state.gameSettings,
          time: {
            ...state.gameSettings.time,
            currentState: action.value
          }
        }
      }
    case Handlers.LEVEL_HANDLER:
      return {
        ...state,
        gameSettings: {
          ...state.gameSettings,
          level: {
            ...state.gameSettings.level,
            currentState: action.value
          }
        }
      }
    default:
      return { ...state }
  }
}
