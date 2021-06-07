import { Question } from '../../../constants/interfaces'

export interface State {
  roomState: boolean
  gameState: boolean
  startGameReq: boolean
  headerDisplay: string
  players: string[]
  timer: number
  leftQuestions: number
  nextQuestion?: Question
  counter: {
    currentValue: number
    counterStatus: boolean
    updateRound: number
  }
  alert: {
    type: 'success' | 'info' | 'warning' | 'error' | undefined
    title: string
    message: string
    status: boolean
  }
  finaleResults: {
    resultsOnDisplay: boolean
    resultsState: boolean
    results: {
      name: string
      correctAnswers: number
      totalQuestions: number
      points: number
    }[]
  }
}

export const initialState: State = {
  roomState: false,
  gameState: false,
  startGameReq: false,
  headerDisplay: 'Please wait...',
  players: [],
  timer: 0,
  leftQuestions: 0,
  counter: {
    currentValue: 0,
    counterStatus: false,
    updateRound: 0
  },
  alert: {
    type: undefined,
    title: '',
    message: '',
    status: false
  },
  finaleResults: {
    resultsOnDisplay: false,
    resultsState: false,
    results: []
  }
}

export enum Handlers {
  CLEAN_SNACKBAR_HANDLER = 'CLEAN_SNACKBAR_HANDLER',
  ALERT_HANDLER = 'ALERT_HANDLER',
  ON_OPEN_ROOM_HANDLER = 'ON_OPEN_ROOM_HANDLER',
  UPDATE_PLAYERS_HANDLERS = 'UPDATE_PLAYERS_HANDLERS',
  START_GAME_REQ_HANDLER = 'START_GAME_REQ_HANDLER',
  HEADER_DISPLAY_HANDLER = 'HEADER_DISPLAY_HANDLER',
  COUNTER_HANDLER = 'COUNTER_HANDLER',
  COUNTER_STATUS_HANDLER = 'COUNTER_STATUS_HANDLER',
  COUNTER_ROUND_HANDLER = 'COUNTER_ROUND_HANDLER',
  SOCKET_GET_READY_HANDLER = 'SOCKET_GET_READY_HANDLER',
  SOCKET_HOST_QUESTION_HANDLER = 'SOCKET_HOST_QUESTION_HANDLER',
  RESULTS_ON_DISPLAY_HANDLER = 'RESULTS_ON_DISPLAY_HANDLER',
  RESULTS_HANDLER = 'RESULTS_HANDLER'
}

export type Action =
  | { type: Handlers.CLEAN_SNACKBAR_HANDLER }
  | {
      type: Handlers.ALERT_HANDLER
      value: {
        type: 'success' | 'info' | 'warning' | 'error' | undefined
        status: boolean
        title: string
        message: string
      }
    }
  | {
      type: Handlers.ON_OPEN_ROOM_HANDLER
      value: {
        roomState: boolean
        alert: {
          type: 'success' | 'info' | 'warning' | 'error' | undefined
          status: boolean
          title: string
          message: string
        }
      }
    }
  | {
      type: Handlers.UPDATE_PLAYERS_HANDLERS
      value: {
        alert: {
          type: 'success' | 'info' | 'warning' | 'error' | undefined
          title: string
          message: string
          status: boolean
        }
        allPlayers: string[]
      }
    }
  | {
      type: Handlers.START_GAME_REQ_HANDLER
      value: boolean
    }
  | {
      type: Handlers.HEADER_DISPLAY_HANDLER
      value: string
    }
  | {
      type: Handlers.COUNTER_HANDLER
      value: {
        currentValue: number
        counterStatus: boolean
      }
    }
  | {
      type: Handlers.COUNTER_STATUS_HANDLER
      value: boolean
    }
  | {
      type: Handlers.COUNTER_ROUND_HANDLER
      value: boolean
    }
  | {
      type: Handlers.SOCKET_GET_READY_HANDLER
      value: {
        message: string
        counter: number
      }
    }
  | {
      type: Handlers.SOCKET_HOST_QUESTION_HANDLER
      value: {
        timer: number
        header: string
        nextQuestion: Question
      }
    }
  | {
      type: Handlers.RESULTS_ON_DISPLAY_HANDLER
      value: boolean
    }
  | {
      type: Handlers.RESULTS_HANDLER
      value: {
        state: boolean
        results: {
          name: string
          correctAnswers: number
          totalQuestions: number
          points: number
        }[]
      }
    }

export const multiplayerRoomReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Handlers.CLEAN_SNACKBAR_HANDLER:
      return {
        ...state,
        alert: {
          type: undefined,
          title: '',
          message: '',
          status: false
        }
      }
    case Handlers.ALERT_HANDLER:
      return {
        ...state,
        alert: {
          type: action.value.type,
          title: action.value.title,
          message: action.value.message,
          status: action.value.status
        }
      }
    case Handlers.ON_OPEN_ROOM_HANDLER:
      return {
        ...state,
        headerDisplay: action.value.roomState ? 'active' : 'not active',
        alert: action.value.alert,
        roomState: action.value.roomState
      }
    case Handlers.UPDATE_PLAYERS_HANDLERS:
      return {
        ...state,
        players: action.value.allPlayers,
        alert: action.value.alert
      }
    case Handlers.START_GAME_REQ_HANDLER:
      return { ...state, startGameReq: action.value }
    case Handlers.HEADER_DISPLAY_HANDLER:
      return { ...state, headerDisplay: action.value }
    case Handlers.COUNTER_HANDLER:
      return {
        ...state,
        counter: {
          ...state.counter,
          currentValue: action.value.currentValue,
          counterStatus: action.value.counterStatus
        }
      }
    case Handlers.COUNTER_STATUS_HANDLER:
      return {
        ...state,
        counter: { ...state.counter, counterStatus: action.value }
      }
    case Handlers.COUNTER_ROUND_HANDLER:
      return {
        ...state,
        counter: {
          ...state.counter,
          updateRound: action.value
            ? state.counter.updateRound + 1
            : state.counter.updateRound
        }
      }
    case Handlers.SOCKET_GET_READY_HANDLER:
      return {
        ...state,
        headerDisplay: action.value.message,
        timer: action.value.counter,
        counter: {
          ...state.counter,
          counterStatus: true,
          updateRound: state.counter.updateRound + 1
        }
      }
    case Handlers.SOCKET_HOST_QUESTION_HANDLER:
      return {
        ...state,
        headerDisplay: action.value.header,
        timer: action.value.timer,
        nextQuestion: action.value.nextQuestion,
        counter: {
          ...state.counter,
          counterStatus: true,
          updateRound: state.counter.updateRound + 1
        }
      }
    case Handlers.RESULTS_ON_DISPLAY_HANDLER:
      return {
        ...state,
        finaleResults: {
          ...state.finaleResults,
          resultsOnDisplay: action.value
        }
      }
    case Handlers.RESULTS_HANDLER:
      return {
        ...state,
        finaleResults: {
          ...state.finaleResults,
          resultsState: action.value.state,
          results: action.value.results
        }
      }
    default:
      return state
  }
}
