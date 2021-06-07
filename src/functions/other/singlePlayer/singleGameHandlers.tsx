import { Answer, Handlers } from '../../tools/singlePlayer/gamePageReducer'
import { singleAnswerRes } from '../../connection/singlePlayer/singleAnswerRes'
import { singleQuestionReq } from '../../connection/singlePlayer/singleQuestionReq'
import { Action } from '../../tools/singlePlayer/gamePageReducer'
import {
  Action as GlobalAction,
  Handlers as GlobalHandlers
} from '../../tools/global/contextReducer'

export const fetchingData = async (
  gameId: string,
  dispatch: React.Dispatch<Action>,
  setUseGlobalState: React.Dispatch<GlobalAction>
) => {
  try {
    const fetchedData = await singleQuestionReq(gameId)
    if (fetchedData) {
      const questionStateUpdate = fetchedData.data.question
      dispatch({
        type: Handlers.QUESTION_UPDATE_HANDLER,
        value: questionStateUpdate
      })
    }
  } catch (e) {
    setUseGlobalState({
      type: GlobalHandlers.SET_ALERT_HANDLER,
      value: {
        type: 'error',
        title: 'Error occured...',
        message: e.message,
        status: true
      }
    })
    dispatch({ type: Handlers.TOGGLE_ALERT_HANDLER, value: true })
  }
}

export const uploadingAnswerData = async (
  gameId: string,
  nextQuestion: number,
  answer: Answer,
  dispatch: (action: Action) => void,
  setUseGlobalState: React.Dispatch<GlobalAction>,
  gameStatus: boolean
) => {
  try {
    dispatch({ type: Handlers.LOADING_HANDLER, value: true })
    await singleAnswerRes(gameId, nextQuestion, answer)
    dispatch({ type: Handlers.REQUESTING_QUESTION_HANDLER, value: gameStatus })
  } catch (e) {
    setUseGlobalState({
      type: GlobalHandlers.SET_ALERT_HANDLER,
      value: {
        type: 'error',
        title: 'Error occured...',
        message: e.message,
        status: true
      }
    })
    dispatch({ type: Handlers.TOGGLE_ALERT_HANDLER, value: true })
  }
}

export const errorHandler = (
  dispatch: (action: Action) => void,
  setUseGlobalState: React.Dispatch<GlobalAction>,
  callback: () => void
) => {
  setUseGlobalState({ type: GlobalHandlers.CLEAR_ALERT_HANDLER })
  dispatch({type: Handlers.TOGGLE_ALERT_HANDLER, value: false})
  callback()
}
