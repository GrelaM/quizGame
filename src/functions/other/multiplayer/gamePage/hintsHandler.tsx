import { Handlers } from '../../../../constants/interface/multiplayerGame/gameHandler'
import { Action } from '../../../../constants/interface/multiplayerGame/gameAction'

const hintsHandler = (
  time: number,
  hints: string[],
  dispatch: React.Dispatch<Action>
) => {
  const nextHintTimer = (time / 3) * 1000
  let number = 0
  dispatch({ type: Handlers.HINTS_HANDLER, value: hints[0] })
  const hintsInterval = setInterval(() => {
    if (number === 0) {
      number += 1
      dispatch({ type: Handlers.HINTS_HANDLER, value: hints[1] })
    } else if (number === 1) {
      number += 1
      dispatch({ type: Handlers.HINTS_HANDLER, value: hints[2] })
    } else {
      clearInterval(hintsInterval)
    }
  }, nextHintTimer)

  return hintsInterval
}

export default hintsHandler
