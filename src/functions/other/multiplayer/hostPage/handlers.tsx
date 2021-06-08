import { LocalStorage } from '../../../../constants/localStorage'
import { Handlers, Action } from '../../../tools/multiplayer/hostPageReducer'
import {
  Handlers as GlobalHandlers,
  Action as GlobalAction
} from '../../../tools/global/contextReducer'
import { multiplayerGameReq } from '../../../connection/multiplayer/multiplayeGameReq'
import { recoveryReq } from '../../../connection/multiplayer/multiplayerRecoveryReq'

export const newGameHandler = async (
  data: {
    quantity: number
    level: number
    time: number
  },
  dispatch: React.Dispatch<Action>,
  setGlobalState: React.Dispatch<GlobalAction>
) => {
  dispatch({ type: Handlers.SET_MODE_HANDLER, value: 1 })
  try {
    const fetchedData = await multiplayerGameReq(data)
    if (fetchedData) {
      setGlobalState({
        type: GlobalHandlers.SET_MULTIPLAYER_GAME,
        value: {
          id: undefined,
          mode: 'multiplayer',
          nickname: 'Anonymous',
          status: 'host',
          gameId: fetchedData.data.gameId,
          roomId: fetchedData.data.roomId,
          quantity: data.quantity,
          timer: data.time,
          level: data.level
        }
      })
      dispatch({
        type: Handlers.FETCHED_DATA_HANDLER,
        value: {
          display: {
            message: fetchedData.data.message,
            header: 'Room: ',
            roomId: fetchedData.data.roomId
          },
          shouldGo: true
        }
      })
      const localStorage = {
        gameId: fetchedData.data.gameId,
        roomId: fetchedData.data.roomId
      }
      window.localStorage.setItem(
        LocalStorage.MULTIPLAYER,
        JSON.stringify(localStorage)
      )
    }
  } catch (e) {
    dispatch({ type: Handlers.TOGGLE_ALERT_HANDLER, value: true })
    setGlobalState({
      type: GlobalHandlers.SET_ALERT_HANDLER,
      value: {
        type: 'error',
        status: true,
        title: e.message,
        message: 'Please try again...'
      }
    })
  }
}

export const openRoomHandler = (
  roomId: string,
  callback: (id: string) => void
) => {
  const id = roomId.substring(1)
  callback(id)
}

export const agreeHandler = async (
  dispatch: React.Dispatch<Action>,
  setGlobalState: React.Dispatch<GlobalAction>
) => {
  try {
    const data: { gameId: string; roomId: string } = JSON.parse(
      window.localStorage.getItem(LocalStorage.MULTIPLAYER)!
    )
    const fetchedData = await recoveryReq(data.gameId)
    if (fetchedData) {
      setGlobalState({
        type: GlobalHandlers.SET_RECOVERY_MODE_MULTIPLAYER_HANDLER,
        value: {
          status: 'host',
          mode: 'multiplayer',
          gameId: data.gameId,
          roomId: data.roomId
        }
      })
      dispatch({
        type: Handlers.RECOVERY_SUCCESS_HANDLER,
        value: {
          display: {
            message: 'Game was recoverd successfully!',
            header: 'Room',
            roomId: data.roomId
          },
          shouldGo: true,
          localStorageAlert: false,
          mode: 1
        }
      })
    }
  } catch (e) {
    dispatch({ type: Handlers.TOGGLE_ALERT_HANDLER, value: true })
    setGlobalState({
      type: GlobalHandlers.SET_ALERT_HANDLER,
      value: {
        type: 'error',
        status: true,
        title: e.message,
        message: 'Please try again...'
      }
    })
  }
}

export const disagreeHandler = (dispatch: React.Dispatch<Action>) => {
  window.localStorage.removeItem(LocalStorage.MULTIPLAYER)
  dispatch({ type: Handlers.RECOVERY_HANDLER, value: false })
}

export const errorHandler = (
  dispatch: React.Dispatch<Action>,
  setGlobalState: React.Dispatch<GlobalAction>,
  callback: () => void
) => {
  dispatch({ type: Handlers.TOGGLE_ALERT_HANDLER, value: false })
  setGlobalState({ type: GlobalHandlers.CLEAR_ALERT_HANDLER })
  callback()
}
