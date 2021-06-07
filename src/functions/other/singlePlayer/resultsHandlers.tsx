import { fetchResultsHandler } from '../../connection/singlePlayer/singleResultsReq'
import { Handlers, Action } from '../../tools/singlePlayer/resultsReducer'
import {
  Handlers as GlobalHandlers,
  Action as GlobalAction
} from '../../tools/global/contextReducer'

export const getResultHandler = async (
  gameId: string,
  dispatch: React.Dispatch<Action>,
  setGlobalState: React.Dispatch<GlobalAction>,
  callback: () => void
) => {
  try {
    const fechtedData = await fetchResultsHandler(gameId)
    if (fechtedData.status === 404) {
      setGlobalState({
        type: GlobalHandlers.SET_ALERT_HANDLER,
        value: {
          type: 'error',
          title: `Ups... ${fechtedData.status}`,
          message: fechtedData.data.message,
          status: true
        }
      })
      dispatch({ type: Handlers.TOGGLE_ALERT_HANDLER, value: true })
      dispatch({ type: Handlers.IS_LOADING_HANDLER, value: false })
    } else {
      dispatch({ type: Handlers.RESULT_HANDLER, value: fechtedData.data })
      callback()
    }
  } catch (e) {
    setGlobalState({
      type: GlobalHandlers.SET_ALERT_HANDLER,
      value: {
        type: 'error',
        title: `Ups... ${e.response.status}`,
        message: e.message,
        status: true
      }
    })
    dispatch({ type: Handlers.TOGGLE_ALERT_HANDLER, value: true })
    dispatch({ type: Handlers.IS_LOADING_HANDLER, value: false })
  }
}
