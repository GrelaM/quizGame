import { recoveryReq } from '../../connection/singlePlayer/singleRecoveryReq'
import { Handlers, Action } from '../../tools/singlePlayer/recoveryPageReducer'
import {
  Handlers as GlobalHandlers,
  Action as GlobalAction
} from '../../tools/global/contextReducer'

export const singleGameRecoveryReq = async (
  gameId: string,
  dispatch: React.Dispatch<Action>,
  setGameState: React.Dispatch<GlobalAction>
) => {
  try {
    const fetchedData = await recoveryReq(gameId)
    if (fetchedData) {
      const recoveredData: {message: string, nextQuestion: number} = fetchedData
      dispatch({
        type: Handlers.PROCEED_GAME_HANDLER,
        value: recoveredData.message
      })
    }
  } catch (e) {
    setGameState({
      type: GlobalHandlers.SET_ALERT_HANDLER,
      value: {
        type: 'error',
        title: e.message,
        message: 'Unfortunately we couldn\'t recovery this game!',
        status: true
      }
    })
    dispatch({ type: Handlers.TOGGLE_ALERT, value: true })
  }
}
