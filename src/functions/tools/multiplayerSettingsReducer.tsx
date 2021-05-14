import { StateInterface } from '../../containers/MultiplayerSettings/SettingsState'
import { Handlers } from '../../containers/MultiplayerSettings/SettingsState'

export const multiplayerSettingsReducer = (
  state: StateInterface,
  action: {
    type: Handlers
    value: number
  }
): StateInterface => {
  switch (action.type) {
    case Handlers.QUANTITY_HANDLER:
      return {
        ...state,
        quantity: { ...state.quantity, currentState: Number(action.value) }
      }
    case Handlers.TIME_HANDLER:
      return {
        ...state,
        time: { ...state.time, currentState: Number(action.value) }
      }
    case Handlers.LEVEL_HANDLER:
      return {
        ...state,
        level: { ...state.level, currentState: Number(action.value) }
      }
    default:
      return state
  }
}
