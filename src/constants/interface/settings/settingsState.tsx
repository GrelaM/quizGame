import { SettingsObject } from '../global/settingsType'

export interface SettingsStateInterface {
  nicknameInput: string
  gameSettings: {
    quantity: SettingsObject
    time: SettingsObject
    level: SettingsObject
  }
}
