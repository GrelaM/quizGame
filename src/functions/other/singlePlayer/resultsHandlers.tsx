import { fetchResultsHandler } from '../../connection/singlePlayer/singleResultsReq'
import { GlobalHandler } from '../../../constants/interface/provider/globalHandler'
import { GlobalAction } from '../../../constants/interface/provider/globalAction'

export const getResultHandler = async (
  gameId: string,
  setStateHandler: (
    points: number,
    correctAnswers: number,
    questionQuantity: number
  ) => void,
  setGlobalState: React.Dispatch<GlobalAction>,
  callback: () => void
) => {
  try {
    const fechtedData = await fetchResultsHandler(gameId)

    if (fechtedData.status === 404) {
      setGlobalState({
        type: GlobalHandler.ALERT_HANDLER,
        value: {
          type: 'error',
          title: `Ups... ${fechtedData.status}`,
          message: fechtedData.data.message,
          status: true,
          displayTimer: 3000
        }
      })
      setGlobalState({
        type: GlobalHandler.SETTINGS_HANDLER,
        value: { toggleLoading: false, credentials: false }
      })
    } else {
      setStateHandler(
        fechtedData.data.points,
        fechtedData.data.givenCorrectAnswers,
        fechtedData.data.questions
      )
      setGlobalState({
        type: GlobalHandler.SETTINGS_HANDLER,
        value: { toggleLoading: false, credentials: false }
      })
      callback()
    }
  } catch (e) {
    setGlobalState({
      type: GlobalHandler.ALERT_HANDLER,
      value: {
        type: 'error',
        title: `Ups... ${e.response.status}`,
        message: e.message,
        status: true,
        displayTimer: 3000
      }
    })
    setGlobalState({
      type: GlobalHandler.SETTINGS_HANDLER,
      value: {
        toggleLoading: false,
        credentials: false
      }
    })
    callback()
  }
}
