import { Handlers } from './roomHandler'
import { QuestionMultiplayer } from '../global/game'

export type Action =
  | {
      type: Handlers.ON_OPEN_ROOM_HANDLER
      value: boolean
    }
  | {
      type: Handlers.UPDATE_PLAYERS_HANDLERS
      value: string[]
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
        nextQuestion: QuestionMultiplayer
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
