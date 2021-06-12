import { singleGameReq } from '../../connection/singlePlayer/singleGameReq'
import { LocalStorage } from '../../../constants/localStorage'

import { GlobalHandler } from '../../../constants/interface/provider/globalHandler'
import { GlobalAction } from '../../../constants/interface/provider/globalAction'

export const startGameHandler = async (
  settings: {
    nickname: string
    quantity: number
    time: number
    level: number
  },
  setGlobalState: React.Dispatch<GlobalAction>,
  callback: () => void
) => {
  setGlobalState({
    type: GlobalHandler.SETTINGS_HANDLER,
    value: { toggleLoading: true, credentials: false }
  })
  try {
    const gameRequest = await singleGameReq(
      settings.quantity,
      settings.time,
      settings.level
    )

    if (gameRequest !== undefined) {
      const fetchedData: {
        data: {
          gameId: string
          artificialGameId: string
          timer: number
        }
      } = gameRequest

      const localStorageData = {
        gameSettings: fetchedData.data,
        user: settings.nickname
      }
      window.localStorage.setItem(
        LocalStorage.SINGLE_GAME,
        JSON.stringify(localStorageData)
      )
      setGlobalState({
        type: GlobalHandler.GAME_HANDLER,
        value: {
          mode: 'single player',
          dummyId: fetchedData.data.artificialGameId,
          gameId: fetchedData.data.gameId,
          roomId: undefined,
          timer: settings.time,
          quantity: settings.quantity,
          level: settings.level
        }
      })
      setGlobalState({
        type: GlobalHandler.USER_HANDLER,
        value: {
          id: undefined,
          status: 'player',
          nickname: settings.nickname
        }
      })
    }
    callback()
    setGlobalState({
      type: GlobalHandler.SETTINGS_HANDLER,
      value: { toggleLoading: false, credentials: false }
    })
  } catch (e) {
    setGlobalState({
      type: GlobalHandler.ALERT_HANDLER,
      value: {
        type: 'error',
        status: true,
        title: e.message,
        message: "We could't create this game. Please try again...",
        displayTimer: 3000
      }
    })
    setGlobalState({
      type: GlobalHandler.SETTINGS_HANDLER,
      value: { toggleLoading: false, credentials: false }
    })
  }
}

export const credentialsDisagreeHandler = (
  callback: () => void,
  setGlobalState: React.Dispatch<GlobalAction>
) => {
  callback()
  setGlobalState({
    type: GlobalHandler.SETTINGS_HANDLER,
    value: { credentials: false, toggleLoading: false }
  })
}

export const credentialsAgreeHandler = (
  callback: () => void,
  setGlobalState: React.Dispatch<GlobalAction>
) => {
  setGlobalState({
    type: GlobalHandler.MENU_HANDLER,
    value: { header: 'Recovery Mode', activeState: true }
  })
  callback()
}
