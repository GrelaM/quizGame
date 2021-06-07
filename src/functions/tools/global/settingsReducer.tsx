type SettingsObject = {
  label: string
  description: string
  variants: {
    key: number
    label: string
    value: number
  }[]
  currentState: number
  reducerType:
    | Handlers.QUANTITY_HANDLER
    | Handlers.TIME_HANDLER
    | Handlers.LEVEL_HANDLER
}

interface SettingsStateInterface {
  nicknameInput: string
  gameSettings: {
    quantity: SettingsObject
    time: SettingsObject
    level: SettingsObject
  }
}

export enum Handlers {
  NICKNAME_HANDLER = 'NICKNAME_HANDLER',
  QUANTITY_HANDLER = 'QUANTITY_HANDLER',
  TIME_HANDLER = 'TIME_HANDLER',
  LEVEL_HANDLER = 'LEVEL_HANDLER'
}

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
      reducerType: Handlers.QUANTITY_HANDLER
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
      reducerType: Handlers.TIME_HANDLER
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
      reducerType: Handlers.LEVEL_HANDLER
    }
  }
}

type Action =
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

export const settingsReducer = (
  state: SettingsStateInterface,
  action: Action
): SettingsStateInterface => {
  switch (action.type) {
    case Handlers.NICKNAME_HANDLER:
      return { ...state, nicknameInput: action.value }
    case Handlers.QUANTITY_HANDLER:
      return {
        ...state,
        gameSettings: {
          ...state.gameSettings,
          quantity: {
            ...state.gameSettings.quantity,
            currentState: action.value
          }
        }
      }
    case Handlers.TIME_HANDLER:
      return {
        ...state,
        gameSettings: {
          ...state.gameSettings,
          time: {
            ...state.gameSettings.time,
            currentState: action.value
          }
        }
      }
    case Handlers.LEVEL_HANDLER:
      return {
        ...state,
        gameSettings: {
          ...state.gameSettings,
          level: {
            ...state.gameSettings.level,
            currentState: action.value
          }
        }
      }
    default:
      return { ...state }
  }
}
