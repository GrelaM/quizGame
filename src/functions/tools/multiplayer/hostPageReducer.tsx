import { Handlers } from '../../../constants/interface/hostPage/hostHandler'
import { Action } from '../../../constants/interface/hostPage/hostAction'
import { HostPageInterface } from '../../../constants/interface/hostPage/hostState'

export const hostPageReducer = (
  state: HostPageInterface,
  action: Action
): HostPageInterface => {
  switch (action.type) {
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
