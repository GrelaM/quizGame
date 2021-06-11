import { GlobalStateInterface } from '../../../constants/interface/provider/globalState'
import { GlobalHandler } from '../../../constants/interface/provider/globalHandler'
import { GlobalAction } from '../../../constants/interface/provider/globalAction'
import { initialState } from '../../../constants/initialState/globalProvider'

export const globalReducer = (
  state: GlobalStateInterface,
  action: GlobalAction
): GlobalStateInterface => {
  switch (action.type) {
    case GlobalHandler.MENU_HANDLER:
      return {
        ...state,
        menu: {
          ...state.menu,
          header: action.value.header,
          activeBtnState: action.value.activeState
        }
      }
    case GlobalHandler.MENU_ALERT_HANDLER:
      return {
        ...state,
        menu: { ...state.menu, toggleHeaderAlert: action.value }
      }
    case GlobalHandler.CLEAR_MENU_ALERT_HANDLER:
      return {
        ...state,
        menu: {
          ...state.menu,
          toggleHeaderAlert: initialState.menu.toggleHeaderAlert
        }
      }
    case GlobalHandler.USER_HANDLER:
      return { ...state, user: action.value }
    case GlobalHandler.GAME_HANDLER:
      return { ...state, game: action.value }
    case GlobalHandler.ALERT_HANDLER:
      return { ...state, alert: action.value }
    case GlobalHandler.CLEAR_ALERT_HANDLER:
      return { ...state, alert: initialState.alert }
    default:
      return { ...state }
  }
}
