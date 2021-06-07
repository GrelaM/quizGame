import { Handlers } from '../../tools/singlePlayer/gamePageReducer'
import { Action } from '../../tools/singlePlayer/gamePageReducer'

export const timeHandler = (
  time: number,
  counter: number,
  dispatch: (action: Action) => void
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
