import { RecoveryState } from '../../../constants/interface/singleRecovery/recoveryState'
import { Handlers } from '../../../constants/interface/singleRecovery/recoveryHandler'
import { Action } from '../../../constants/interface/singleRecovery/recoveryAction'

export const recoveryReducer = (
  state: RecoveryState,
  action: Action
): RecoveryState => {
  switch (action.type) {
    case Handlers.RECOVERED_DATA_HANDLER:
      return {
        ...state,
        recoveredData: action.value
      }
    case Handlers.PROCEED_GAME_HANDLER:
      return {
        ...state,
        proceedGame: true,
        message: action.value
      }
    default:
      return { ...state }
  }
}
