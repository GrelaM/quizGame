import { Handlers } from '../../pages/singleplayer/GamePage'

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

export const timeHandler = (
  time: number,
  counter: number,
  dispatch: (value: {
    type: Handlers
    value: string | number | boolean | NextQuestion
  }) => void
) => {
  let leftTime: number
  leftTime = time - 0.1
  let counterValue = counter

  const timeInterval = setInterval(() => {
    leftTime = leftTime - 0.1
    counterValue = counterValue + 100 / time / 10
    dispatch({ type: Handlers.COUNTER_HANDLER, value: counterValue })
    if (leftTime <= 0) {
      clearInterval(timeInterval)

      setTimeout(() => {
        dispatch({ type: Handlers.UPLOADING_ANSWER_HANDLER, value: true })
      }, 500) // THIS IS BECAUSE OF JS PROBLEMS WITH 0.00000001
    }
  }, 100)

  return timeInterval
}
