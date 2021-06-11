import { SettingsHandler as Handlers } from './settingsHandler'

export type Action =
  | {
      type: Handlers.NICKNAME_HANDLER
      value: string
    }
  | {
      type: Handlers.QUANTITY_HANDLER
      value: number
    }
  | {
      type: Handlers.TIME_HANDLER
      value: number
    }
  | {
      type: Handlers.LEVEL_HANDLER
      value: number
    }
