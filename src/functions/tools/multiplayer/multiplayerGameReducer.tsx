import { Question } from '../../../constants/interfaces'

export enum GameMode {
  WAIT = 'WAIT',
  GAME = 'GAME',
  RESULTS = 'RESULTS'
}

export interface MultiplayerGameStateInterface {
  players: {
    array: string[]
    alert: {
      type: 'success' | 'info' | 'warning' | 'error' | undefined
      title: string
      message: string
      status: boolean
      showTimer: number
    }
  }
  game: {
    header: string
    mode: GameMode
    displayedHints: string[]
    timer: number
    counter: number
    counterState: boolean
    counterRounds: number
    chosenAnswer: number
    btnState: boolean
  }
  question: Question
  onLoading: boolean
  finaleResults: {
    resultsState: boolean
    results: {
      name: string
      correctAnswers: number
      totalQuestions: number
      points: number
    }[]
  }
}

export const initialState: MultiplayerGameStateInterface = {
  players: {
    array: [],
    alert: {
      type: undefined,
      title: '',
      message: '',
      status: false,
      showTimer: 1000
    }
  },
  game: {
    header: 'Please wait...',
    mode: GameMode.WAIT,
    displayedHints: [],
    timer: 0,
    counter: 0,
    counterState: false,
    counterRounds: 0,
    chosenAnswer: -1,
    btnState: false
  },
  question: {
    Category: '',
    Difficulty: 0,
    Hints: [],
    Answers: [
      { code: 1, value: 'A' },
      { code: 2, value: 'B' },
      { code: 3, value: 'C' },
      { code: 4, value: 'D' }
    ],
    Question: 'Loading...'
  },
  onLoading: false,
  finaleResults: {
    resultsState: false,
    results: []
  }
}

export enum Handlers {
  UPDATE_PLAYERS_HANDLERS = 'UPDATE_PLAYERS_HANDLERS',
  CLEAN_ALERT_HANDLER = 'CLEAN_ALERT_HANDLER',
  BUTTON_HANDLER = 'BUTTON_HANDLER',
  HEADER_HANDLER = 'HEADER_HANDLER',
  COUNTER_HANDLER = 'COUNTER_HANDLER',
  HINTS_HANDLER = 'HINTS_HANDLER',
  ON_GET_READY_SOCKET_HANDLER = 'ON_GET_READY_SOCKET_HANDLER',
  ON_QUESTION_SOCKET_HANDLER = 'ON_QUESTION_SOCKET_HANDLER',
  LOADING_HANDLER = 'LOADING_HANDLER',
  RESULTS_ON_DISPLAY_HANDLER = 'RESULTS_ON_DISPLAY_HANDLER',
  RESULTS_HANDLER = 'RESULTS_HANDLER'
}

export type Action =
  | { type: Handlers.CLEAN_ALERT_HANDLER }
  | {
      type: Handlers.UPDATE_PLAYERS_HANDLERS
      value: {
        array: string[]
        alert: {
          type: 'success' | 'info' | 'warning' | 'error' | undefined
          title: string
          message: string
          status: boolean
          showTimer: number
        }
      }
    }
  | {
      type: Handlers.BUTTON_HANDLER
      value: number
    }
  | {
      type: Handlers.HEADER_HANDLER
      value: string
    }
  | {
      type: Handlers.ON_GET_READY_SOCKET_HANDLER
      value: { message: string; counter: number }
    }
  | {
      type: Handlers.COUNTER_HANDLER
      value: {
        currentValue: number
        counterStatus: boolean
      }
    }
  | {
      type: Handlers.HINTS_HANDLER
      value: string
    }
  | {
      type: Handlers.ON_QUESTION_SOCKET_HANDLER
      value: {
        questionUpadate: Question
        playerUpadate: {
          roomId: string
          timer: number
          questionNumber: number
          totalQuestions: number
        }
        message: string
      }
    }
  | {
      type: Handlers.LOADING_HANDLER
      value: boolean
    }
  | {
      type: Handlers.RESULTS_ON_DISPLAY_HANDLER
      value: GameMode
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

export const multiplayerGameReducer = (
  state: MultiplayerGameStateInterface,
  action: Action
): MultiplayerGameStateInterface => {
  switch (action.type) {
    case Handlers.UPDATE_PLAYERS_HANDLERS:
      return {
        ...state,
        players: {
          array: action.value.array,
          alert: action.value.alert
        }
      }
    case Handlers.CLEAN_ALERT_HANDLER:
      return {
        ...state,
        players: {
          ...state.players,
          alert: {
            type: undefined,
            title: '',
            message: '',
            status: false,
            showTimer: 1000
          }
        }
      }
    case Handlers.BUTTON_HANDLER:
      return {
        ...state,
        game: { ...state.game, chosenAnswer: action.value, btnState: false }
      }
    case Handlers.HEADER_HANDLER:
      return {
        ...state,
        question: { ...state.question, Question: action.value }
      }
    case Handlers.ON_GET_READY_SOCKET_HANDLER:
      return {
        ...state,
        question: { ...state.question, Question: action.value.message },
        game: {
          ...state.game,
          timer: action.value.counter,
          mode: GameMode.GAME,
          counterState: true,
          counterRounds: state.game.counterRounds + 1
        }
      }
    case Handlers.COUNTER_HANDLER:
      return {
        ...state,
        game: {
          ...state.game,
          counter: action.value.currentValue,
          counterState: action.value.counterStatus
        }
      }
    case Handlers.HINTS_HANDLER:
      return {
        ...state,
        game: {
          ...state.game,
          displayedHints: state.game.displayedHints.concat(action.value)
        }
      }
    case Handlers.ON_QUESTION_SOCKET_HANDLER:
      return {
        ...state,
        onLoading: false,
        question: action.value.questionUpadate,
        game: {
          ...state.game,
          displayedHints: [],
          header: action.value.message,
          timer: action.value.playerUpadate.timer,
          chosenAnswer: -1,
          btnState: true,
          counterState: true,
          counterRounds: state.game.counterRounds + 1
        }
      }
    case Handlers.LOADING_HANDLER:
      return { ...state, onLoading: action.value }
    case Handlers.RESULTS_ON_DISPLAY_HANDLER:
      return {
        ...state,
        game: { ...state.game, mode: action.value }
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
      return { ...state }
  }
}
