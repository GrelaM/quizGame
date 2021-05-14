import { Answer, Handlers } from '../../pages/singleplayer/GamePage'
import { singleAnswerRes } from '../connection/singleAnswerRes'
import { singleQuestionReq } from '../connection/singleQuestionReq'

type NextQuestion = {
  nextQuestion: {
    category: string
    questionNumber: number
    question: string
    hints: string[]
    answers: {
      code: number
      value: string
    }[]
    gameStatus: boolean
  }
}

export const fetchingData = async (
  gameId: string,
  dispatch: (value: {
    type: Handlers
    value: NextQuestion
  }) => void
) => {
  try {
    const fetchedData = await singleQuestionReq(gameId)
    if (fetchedData) {
      // console.log(fetchedData.data.question)
      const questionStateUpdate = fetchedData.data.question
      dispatch({
        type: Handlers.QUESTION_UPDATE_HANDLER,
        value: questionStateUpdate
      })
    }
  } catch (e) {
    console.log(e)
  }
}

export const uploadingAnswerData = async (
  gameId: string,
  nextQuestion: number,
  answer: Answer,
  dispatch: (value: {
    type: Handlers
    value: boolean
  }) => void,
  gameStatus: boolean
) => {
  try {
    dispatch({ type: Handlers.LOADING_HANDLER, value: true })
    const uploadedData = await singleAnswerRes(gameId, nextQuestion, answer)
    if (uploadedData?.data.status) {
      console.log(uploadedData.data.message)
    }
    dispatch({ type: Handlers.REQUESTING_QUESTION_HANDLER, value: gameStatus })
  } catch (e) {
    console.log(e)
  }
}
