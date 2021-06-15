import { GlobalHandler } from './globalHandler'

export type GlobalAction =
  | {
      type: GlobalHandler.MENU_HANDLER
      value: {
        header: string
        activeState: boolean
      }
    }
  | {
      type: GlobalHandler.MENU_ALERT_HANDLER
      value: {
        type: undefined | 'info' | 'success' | 'error' | 'warning'
        status: boolean
        title: string
        message: string
        displayTimer: number
      }
    }
  | {
      type: GlobalHandler.CLEAR_MENU_ALERT_HANDLER
    }
  | {
      type: GlobalHandler.USER_HANDLER
      value: {
        id: undefined | string
        status: undefined | 'host' | 'player'
        nickname: 'Anonymous' | string
      }
    }
  | {
      type: GlobalHandler.GAME_HANDLER
      value: {
        mode: undefined | 'single player' | 'multiplayer'
        dummyId: undefined | string
        gameId: undefined | string
        roomId: undefined | string
        timer: undefined | number
        quantity: undefined | number
        level: undefined | number
      }
    } | {
      type: GlobalHandler.MODE_HANDLER,
      value: undefined | 'single player' | 'multiplayer'
    }
  | {
      type: GlobalHandler.ALERT_HANDLER
      value: {
        type: undefined | 'info' | 'success' | 'error' | 'warning'
        status: boolean
        title: string
        message: string
        displayTimer: number
      }
    }
  | {
      type: GlobalHandler.CLEAR_ALERT_HANDLER
    }
  | {
      type: GlobalHandler.SETTINGS_HANDLER
      value: {
        toggleLoading: boolean
        credentials: boolean
      }
    }
  | {
      type: GlobalHandler.RESET_HANDLER
    }
