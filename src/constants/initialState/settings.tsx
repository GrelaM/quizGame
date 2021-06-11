import { SettingsStateInterface } from '../interface/settings/settingsState'
import { SettingsHandler } from '../interface/settings/settingsHandler'

export const initialState: SettingsStateInterface = {
  nicknameInput: '',
  gameSettings: {
    quantity: {
      label: 'quantity',
      description: 'Number of questions',
      variants: [
        { key: 0, label: '10', value: 10 },
        { key: 1, label: '20', value: 20 },
        { key: 2, label: '30', value: 30 }
      ],
      currentState: 0,
      reducerType: SettingsHandler.QUANTITY_HANDLER
    },
    time: {
      label: 'time',
      description: 'Time',
      variants: [
        { key: 0, label: '9', value: 9 },
        { key: 1, label: '15', value: 15 },
        { key: 2, label: '21', value: 21 }
      ],
      currentState: 0,
      reducerType: SettingsHandler.TIME_HANDLER
    },
    level: {
      label: 'level',
      description: 'Level',
      variants: [
        { key: 0, label: 'EASY', value: 1 },
        { key: 1, label: 'MEDIUM', value: 2 },
        { key: 2, label: 'HARD', value: 3 }
      ],
      currentState: 0,
      reducerType: SettingsHandler.LEVEL_HANDLER
    }
  }
}
