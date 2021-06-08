export interface GlobalStateContextType {
  header: string
  mode: undefined | 'single player' | 'multiplayer'
  user: {
    id: undefined | string
    status: undefined | 'host' | 'player'
    nickname: 'Anonymous' | string
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
  SET_MULTIPLAYER_GAME = 'SET_MULTIPLAYER_GAME',
  JOIN_MULTIPLAYER_GAME = 'JOIN_MULTIPLAYER_GAME',
  SET_RECOVERY_MODE_SINGLE_GAME_HANDLER = 'SET_RECOVERY_MODE_SINGLE_GAME_HANDLER',
  SET_RECOVERY_MODE_MULTIPLAYER_HANDLER = 'SET_RECOVERY_MODE_MULTIPLAYER_HANDLER',
  ON_GAME_SETTINGS_HANDLER = 'ON_GAME_SETTINGS_HANDLER',
  RESET_STATE = 'RESET_STATE'
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
      type: Handlers.SET_MULTIPLAYER_GAME
      value: {
        mode: undefined | 'multiplayer'
        id: undefined | string
        status: undefined | 'host'
        nickname: 'Anonymous' | string
        gameId: string
        roomId: string
        timer: number
        quantity: number
        level: number
      }
    }
  | {
      type: Handlers.JOIN_MULTIPLAYER_GAME
      value: {
        mode: undefined | 'multiplayer'
        status: undefined | 'player'
        nickname: 'Anonymous' | string
        gameId: string
        roomId: string
      }
    }
  | {
      type: Handlers.SET_RECOVERY_MODE_SINGLE_GAME_HANDLER
      value: {
        nickname: string
        status: 'player'
        artificialGameId: string
        gameId: string
        timer: number
      }
    }
  | {
      type: Handlers.SET_RECOVERY_MODE_MULTIPLAYER_HANDLER
      value: {
        mode: 'multiplayer'
        status: 'host'
        gameId: string
        roomId: string
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
    case Handlers.SET_MULTIPLAYER_GAME:
      return {
        ...state,
        mode: action.value.mode,
        user: {
          id: action.value.id,
          nickname: action.value.nickname,
          status: action.value.status
        },
        multiplayer: {
          gameId: action.value.gameId,
          roomId: action.value.roomId
        },
        currentGameInfo: {
          timer: action.value.timer,
          level: action.value.level,
          quantity: action.value.quantity
        }
      }
    case Handlers.JOIN_MULTIPLAYER_GAME:
      return {
        ...state,
        mode: action.value.mode,
        user: {
          ...state.user,
          nickname: action.value.nickname,
          status: action.value.status
        },
        multiplayer: {
          gameId: action.value.gameId,
          roomId: action.value.roomId
        }
      }
    case Handlers.SET_RECOVERY_MODE_SINGLE_GAME_HANDLER:
      return {
        ...state,
        user: {
          ...state.user,
          nickname: action.value.nickname,
          status: action.value.status
        },
        singleGame: {
          artificialGameId: action.value.artificialGameId,
          gameId: action.value.gameId
        },
        currentGameInfo: {
          ...state.currentGameInfo,
          timer: action.value.timer
        }
      }
    case Handlers.SET_RECOVERY_MODE_MULTIPLAYER_HANDLER:
      return {
        ...state,
        mode: action.value.mode,
        user: {
          ...state.user,
          status: action.value.status
        },
        multiplayer: {
          gameId: action.value.gameId,
          roomId: action.value.roomId
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
