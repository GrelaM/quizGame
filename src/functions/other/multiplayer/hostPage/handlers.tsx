import { LocalStorage } from '../../../../constants/interface/global/localStorage'
import { multiplayerGameReq } from '../../../connection/multiplayer/multiplayeGameReq'
import { recoveryReq } from '../../../connection/multiplayer/multiplayerRecoveryReq'

import { Handlers } from '../../../../constants/interface/hostPage/hostHandler'
import { Action } from '../../../../constants/interface/hostPage/hostAction'
import { GlobalHandler } from '../../../../constants/interface/provider/globalHandler'
import { GlobalAction } from '../../../../constants/interface/provider/globalAction'

export const newGameHandler = async (
  data: {
    quantity: number
    level: number
    time: number
  },
  dispatch: React.Dispatch<Action>,
  setGlobalState: React.Dispatch<GlobalAction>,
  callback: () => void
) => {
  dispatch({ type: Handlers.SET_MODE_HANDLER, value: 1 })
  try {
    const fetchedData = await multiplayerGameReq(data)
    if (fetchedData) {
      setGlobalState({
        type: GlobalHandler.USER_HANDLER,
        value: { id: undefined, nickname: 'Unknown', status: 'host' }
      })
      setGlobalState({
        type: GlobalHandler.GAME_HANDLER,
        value: {
          mode: 'multiplayer',
          gameId: fetchedData.data.gameId,
          roomId: fetchedData.data.roomId,
          dummyId: undefined,
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
        roomId: fetchedData.data.roomId,
        quantity: data.quantity,
        timer: data.time,
        level: data.level
      }
      window.localStorage.setItem(
        LocalStorage.MULTIPLAYER,
        JSON.stringify(localStorage)
      )
    }
  } catch (e) {
    setGlobalState({
      type: GlobalHandler.ALERT_HANDLER,
      value: {
        type: 'error',
        status: true,
        title: e.message,
        message: 'Please try again...',
        displayTimer: 4000
      }
    })
    callback()
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
    const data: {
      gameId: string
      roomId: string
      quantity: number
      timer: number
      level: number
    } = JSON.parse(window.localStorage.getItem(LocalStorage.MULTIPLAYER)!)
    const fetchedData = await recoveryReq(data.gameId)
    console.log(fetchedData.status)
    if (fetchedData.status === 200) {
      setGlobalState({
        type: GlobalHandler.USER_HANDLER,
        value: { id: undefined, nickname: 'Unknown', status: 'host' }
      })
      setGlobalState({
        type: GlobalHandler.GAME_HANDLER,
        value: {
          mode: 'multiplayer',
          gameId: data.gameId,
          roomId: data.roomId,
          dummyId: undefined,
          quantity: data.quantity,
          timer: data.timer,
          level: data.level
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
    setGlobalState({
      type: GlobalHandler.ALERT_HANDLER,
      value: {
        type: 'error',
        status: true,
        title: e.message,
        message: 'Please try again...',
        displayTimer: 4000
      }
    })
  }
}

export const disagreeHandler = (dispatch: React.Dispatch<Action>) => {
  window.localStorage.removeItem(LocalStorage.MULTIPLAYER)
  dispatch({ type: Handlers.RECOVERY_HANDLER, value: false })
}
