import { Handlers } from './recoveryHandler'

export type Action =
  | {
      type: Handlers.RECOVERED_DATA_HANDLER
      value: boolean
    }
  | {
      type: Handlers.PROCEED_GAME_HANDLER
      value: string
    }
