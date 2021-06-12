import { recoveryReq } from '../../connection/singlePlayer/singleRecoveryReq'
import { Handlers } from '../../../constants/interface/singleRecovery/recoveryHandler'
import { Action } from '../../../constants/interface/singleRecovery/recoveryAction'
import { GlobalHandler } from '../../../constants/interface/provider/globalHandler'
import { GlobalAction } from '../../../constants/interface/provider/globalAction'

export const singleGameRecoveryReq = async (
  gameId: undefined | string,
  dispatch: React.Dispatch<Action>,
  setGlobalState: React.Dispatch<GlobalAction>
) => {
  try {
    if (gameId === undefined) throw new Error('Recovery failed!')
    const fetchedData = await recoveryReq(gameId)
    if (fetchedData) {
      const recoveredData: { message: string; nextQuestion: number } =
        fetchedData
      dispatch({
        type: Handlers.PROCEED_GAME_HANDLER,
        value: recoveredData.message
      })
    }
  } catch (e) {
    setGlobalState({
      type: GlobalHandler.ALERT_HANDLER,
      value: {
        type: 'error',
        title: e.message,
        message: "Unfortunately we couldn't recovery this game!",
        status: true,
        displayTimer: 3000
      }
    })
    setGlobalState({
      type: GlobalHandler.SETTINGS_HANDLER,
      value: { toggleLoading: true, credentials: true }
    })
  }
}
