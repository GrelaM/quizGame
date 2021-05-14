import { recoveryReq } from '../connection/singleRecoveryReq'
import { Handlers } from '../../pages/singleplayer/RecoveryPage'

export const singleGameRecoveryReq = async (
  gameId: string,
  dispatch: (value: { type: Handlers; value: boolean }) => void
) => {
  const fetchedData = await recoveryReq(gameId)
  try {
    if (fetchedData) {
      dispatch({ type: Handlers.PROCEED_GAME_HANDLER, value: fetchedData.data.message })
      return fetchedData.data
    }
  } catch (e) {
    console.log(e)
  }
}
