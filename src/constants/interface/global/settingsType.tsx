import { SettingsHandler } from '../settings/settingsHandler'

export type SettingsObject = {
  label: string
  description: string
  variants: {
    key: number
    label: string
    value: number
  }[]
  currentState: number
  reducerType:
    | SettingsHandler.QUANTITY_HANDLER
    | SettingsHandler.TIME_HANDLER
    | SettingsHandler.LEVEL_HANDLER
}
