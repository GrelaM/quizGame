export interface GlobalStateContextType {
  header: string
  mode: undefined | 'single player' | 'multiplayer'
  user: {
    id: undefined | string
    status: undefined | 'host' | 'player'
    nickname: string
  }
  singleGame: {
    gameId: string
    artificialGameId: string
  }
  multiplayer: {
    gameId: string
    roomId: string
  }
  currentGameInfo: {
    timer: number
    quantity: number
    level: number
  }
  alert: {
    type: undefined | 'info' | 'success' | 'error' | 'warning'
    status: boolean
    title: string
    message: string
  }
}

export const initialState: GlobalStateContextType = {
  header: 'Quiz Game',
  mode: undefined,
  user: {
    id: undefined,
    status: undefined,
    nickname: 'Anonymous'
  },
  singleGame: {
    gameId: '',
    artificialGameId: '#'
  },
  multiplayer: {
    gameId: '',
    roomId: ''
  },
  currentGameInfo: {
    timer: 0,
    quantity: 0,
    level: 0
  },
  alert: {
    type: undefined,
    status: false,
    title: '',
    message: ''
  }
}

export enum Handlers {
  HEADER_HANDLER = 'HEADER_HANDLER',
  SET_ALERT_HANDLER = 'SET_ALERT_HANDLER',
  CLEAR_ALERT_HANDLER = 'CLEAR_ALERT_HANDLER',
  SET_SINGLE_PLAYER_GAME = 'SET_SINGLE_PLAYER_GAME',
  ON_GAME_SETTINGS_HANDLER = 'ON_GAME_SETTINGS_HANDLER',
  RESET_STATE = 'RESET_STATE',

  MODE_HANDLER = 'MODE_HANDLER',
  USER_INFO_HANDLER = 'USER_INFO_HANDLER',
  SINGLE_GAME_HANDLER = 'SINGLE_GAME_HANDLER',
  MULTIPLAYER_GAME_HANDLER = 'MULTIPLAYER_GAME_HANDLER',
  CURRENT_GAME_HANDLER = 'CURRENT_GAME_HANDLER'
}

export type Action =
  | {
      type: Handlers.HEADER_HANDLER
      value: string
    }
  | {
      type: Handlers.SET_SINGLE_PLAYER_GAME
      value: {
        mode: undefined | 'single player' | 'multiplayer'
        id: undefined | string
        status: undefined | 'host' | 'player'
        nickname: string
        gameId: string
        artificialGameId: string
        timer: number
        quantity: number
        level: number
      }
    }
  | {
      type: Handlers.MODE_HANDLER
      value: undefined | 'single player' | 'multiplayer'
    }
  | {
      type: Handlers.USER_INFO_HANDLER
      value: {
        id: undefined | string
        status: undefined | 'host' | 'player'
        nickname: string
      }
    }
  | {
      type: Handlers.SINGLE_GAME_HANDLER
      value: {
        gameId: string
        artificialGameId: string
      }
    }
  | {
      type: Handlers.MULTIPLAYER_GAME_HANDLER
      value: {
        gameId: string
        roomId: string
      }
    }
  | {
      type: Handlers.CURRENT_GAME_HANDLER
      value: {
        timer: 0
        totalQuestion: 0
        level: 0
      }
    }
  | {
      type: Handlers.SET_ALERT_HANDLER
      value: {
        type: undefined | 'info' | 'success' | 'error' | 'warning'
        status: boolean
        title: string
        message: string
      }
    }
  | {
      type: Handlers.CLEAR_ALERT_HANDLER
    }
  | {
      type: Handlers.ON_GAME_SETTINGS_HANDLER
      value: {
        header: string
        mode: 'single player' | 'multiplayer'
      }
    }
  | {
      type: Handlers.RESET_STATE
    }

export const globalContextReducer = (
  state: GlobalStateContextType,
  action: Action
): GlobalStateContextType => {
  switch (action.type) {
    case Handlers.HEADER_HANDLER:
      return { ...state, header: action.value }
    case Handlers.SET_SINGLE_PLAYER_GAME:
      return {
        ...state,
        mode: action.value.mode,
        user: {
          id: action.value.id,
          nickname: action.value.nickname,
          status: action.value.status
        },
        singleGame: {
          gameId: action.value.gameId,
          artificialGameId: action.value.artificialGameId
        },
        currentGameInfo: {
          timer: action.value.timer,
          level: action.value.level,
          quantity: action.value.quantity
        }
      }
    case Handlers.MODE_HANDLER:
      return { ...state, mode: action.value }
    case Handlers.USER_INFO_HANDLER:
      return {
        ...state,
        user: {
          id: action.value.id,
          nickname: action.value.nickname,
          status: action.value.status
        }
      }
    case Handlers.SINGLE_GAME_HANDLER:
      return {
        ...state,
        singleGame: {
          gameId: action.value.gameId,
          artificialGameId: action.value.artificialGameId
        }
      }
    case Handlers.MULTIPLAYER_GAME_HANDLER:
      return {
        ...state,
        multiplayer: {
          gameId: action.value.gameId,
          roomId: action.value.roomId
        }
      }
    case Handlers.CURRENT_GAME_HANDLER:
      return {
        ...state,
        currentGameInfo: {
          timer: action.value.timer,
          level: action.value.level,
          quantity: action.value.timer
        }
      }
    case Handlers.SET_ALERT_HANDLER:
      return {
        ...state,
        alert: {
          type: action.value.type,
          status: action.value.status,
          title: action.value.title,
          message: action.value.message
        }
      }
    case Handlers.CLEAR_ALERT_HANDLER:
      return { ...state, alert: initialState.alert }
    case Handlers.ON_GAME_SETTINGS_HANDLER:
      return { ...state, header: action.value.header, mode: action.value.mode }
    case Handlers.RESET_STATE:
      return initialState
    default:
      return { ...state }
  }
}
