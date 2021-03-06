import {
    Action,
    Handlers
  } from '../../../tools/multiplayer/multiplayerGameReducer'
  
  const counterHandler = (
    time: number, // 3 seconds 3000
    hints: string[],
    dispatch: React.Dispatch<Action>
  ) => {
    let currentCounter = 0
  
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

        // if(hints.length > 0) {
        //   setTimeout(() => {
        //     dispatch({type: Handlers.LOADING_HANDLER, value: true})
        //   }, 500)
        // } else {
        //   dispatch({type: Handlers.LOADING_HANDLER, value: true})
        // }
      }
    }, 100)
  
    return updateCounter
  }
  
  export default counterHandler
  
  /*
    1. Update header
    2. Update time
  */
  