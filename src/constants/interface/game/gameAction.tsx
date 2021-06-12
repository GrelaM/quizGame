import { Handlers } from './gameHandler'
import { Question } from '../global/game'

export type Action =
  | {
      type: Handlers.COUNTER_HANDLER
      value: number
    }
  | {
      type: Handlers.HINTS_HANDLER
      value: string
    }
  | {
      type: Handlers.QUESTION_UPDATE_HANDLER
      value: Question
    }
  | {
      type: Handlers.REQUESTING_QUESTION_HANDLER
      value: boolean
    }
  | {
      type: Handlers.UPLOADING_ANSWER_HANDLER
      value: boolean
    }
