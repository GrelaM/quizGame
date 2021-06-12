import { Handlers } from '../../../constants/interface/game/gameHandler'
import { Action } from '../../../constants/interface/game/gameAction'
import { GlobalHandler } from '../../../constants/interface/provider/globalHandler'
import { GlobalAction } from '../../../constants/interface/provider/globalAction'
import { Answer } from '../../../constants/interface/global/game'

import { singleAnswerRes } from '../../connection/singlePlayer/singleAnswerRes'
import { singleQuestionReq } from '../../connection/singlePlayer/singleQuestionReq'

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
      type: GlobalHandler.ALERT_HANDLER,
      value: {
        type: 'error',
        title: 'Error occured...',
        message: e.message,
        status: true,
        displayTimer: 3000
      }
    })
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
    setUseGlobalState({
      type: GlobalHandler.SETTINGS_HANDLER,
      value: { toggleLoading: true, credentials: false }
    })
    await singleAnswerRes(gameId, nextQuestion, answer)
    dispatch({ type: Handlers.REQUESTING_QUESTION_HANDLER, value: gameStatus })
  } catch (e) {
    setUseGlobalState({
      type: GlobalHandler.ALERT_HANDLER,
      value: {
        type: 'error',
        title: 'Error occured...',
        message: e.message,
        status: true,
        displayTimer: 3000
      }
    })
    setUseGlobalState({
      type: GlobalHandler.SETTINGS_HANDLER,
      value: { toggleLoading: true, credentials: false }
    }) 
  }
}

