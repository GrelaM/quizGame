import { recoveryReq } from '../../connection/singlePlayer/singleRecoveryReq'
import { Handlers } from '../../../pages/singleplayer/RecoveryPage'
import { Action } from '../../tools/singlePlayer/recoveryPageReducer'

export const singleGameRecoveryReq = async (
  gameId: string,
  dispatch: (action: Action) => void
) => {
  const fetchedData = await recoveryReq(gameId)
  try {
    if (fetchedData) {
      dispatch({
        type: Handlers.PROCEED_GAME_HANDLER,
        value: fetchedData.data.message
      })
      return fetchedData.data
    }
  } catch (e) {
    console.log(e)
  }
}
