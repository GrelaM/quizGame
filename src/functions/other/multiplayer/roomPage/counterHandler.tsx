import { Handlers } from '../../../../constants/interface/multiplayerRoom/roomHandler'
import { Action } from '../../../../constants/interface/multiplayerRoom/roomAction'

const counterHandler = (
  message: string,
  time: number, // 3 seconds 3000
  dispatch: React.Dispatch<Action>
) => {
  let currentCounter = 0

  dispatch({ type: Handlers.HEADER_DISPLAY_HANDLER, value: message })
  dispatch({
    type: Handlers.COUNTER_HANDLER,
    value: {
      currentValue: currentCounter,
      counterStatus: true
    }
  })

  const updateCounter = setInterval(() => {
    currentCounter = currentCounter + 100 / time / 10
    dispatch({
      type: Handlers.COUNTER_HANDLER,
      value: {
        currentValue: currentCounter,
        counterStatus: true
      }
    })
    if (currentCounter >= 100) {
      clearInterval(updateCounter)
      dispatch({
        type: Handlers.COUNTER_HANDLER,
        value: {
          currentValue: currentCounter,
          counterStatus: false
        }
      })
    }
  }, 100)

  return updateCounter
}

export default counterHandler

/*
  1. Update header
  2. Update time
*/
