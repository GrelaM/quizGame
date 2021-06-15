import { QuestionMultiplayer, GameMode } from '../global/game'
import { Handlers } from './gameHandler'

export type Action =
  | {
      type: Handlers.UPDATE_PLAYERS_HANDLERS
      value: string[]
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
        questionUpadate: QuestionMultiplayer
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
