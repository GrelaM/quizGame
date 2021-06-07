import { singleGameReq } from '../../connection/singlePlayer/singleGameReq'
import { Handlers, Action } from '../../tools/singlePlayer/singlePlayerReducer'
import {
  Action as GlobalAction,
  Handlers as GlobalHandlers
} from '../../tools/global/contextReducer'
import {LocalStorage} from '../../../constants/localStorage'

export const startGameHandler = async (
  settings: {
    nickname: string
    quantity: number
    time: number
    level: number
  },
  dispatch: React.Dispatch<Action>,
  setGlobalState: React.Dispatch<GlobalAction>,
  callback: () => void
) => {
  dispatch({ type: Handlers.LOADER_HANDLER, value: true })
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
      window.localStorage.setItem(LocalStorage.SINGLE_GAME, JSON.stringify(localStorageData))
      setGlobalState({
        type: GlobalHandlers.SET_SINGLE_PLAYER_GAME,
        value: {
          mode: 'single player',
          id: undefined,
          status: 'player',
          nickname: settings.nickname,
          gameId: fetchedData.data.gameId,
          artificialGameId: fetchedData.data.artificialGameId,
          timer: settings.time,
          quantity: settings.quantity,
          level: settings.level
        }
      })
    }
    callback()
    dispatch({ type: Handlers.LOADER_HANDLER, value: false })
  } catch (e) {
    setGlobalState({
      type: GlobalHandlers.SET_ALERT_HANDLER,
      value: {
        type: 'error',
        status: true,
        title: e.message,
        message: "We could't create this game. Please try again..."
      }
    })
    dispatch({ type: Handlers.LOADER_HANDLER, value: false })
    dispatch({ type: Handlers.TOGGLE_ALERT_HANDLER, value: true })
  }
}

export const credentialsDisagreeHandler = (
  callback: () => void,
  dispatch: React.Dispatch<Action>
) => {
  callback()
  dispatch({ type: Handlers.CREDENTIALS_HANDLER, value: false })
}

export const credentialsAgreeHandler = (
  callback: () => void,
  setGlobalState: React.Dispatch<GlobalAction>
) => {
  setGlobalState({
    type: GlobalHandlers.HEADER_HANDLER,
    value: 'Recovery Mode'
  })
  callback()
}

export const clearAlertHandler = (
  dispatch: React.Dispatch<Action>,
  setGlobalState: React.Dispatch<GlobalAction>
) => {
  dispatch({ type: Handlers.TOGGLE_ALERT_HANDLER, value: false })
  setGlobalState({ type: GlobalHandlers.CLEAR_ALERT_HANDLER })
}
