export enum Handlers {
  STATE_HANDLER = 'STATE_HANDLER',
  QUANTITY_HANDLER = 'QUANTITY_HANDLER',
  TIME_HANDLER = 'TIME_HANDLER',
  LEVEL_HANDLER = 'LEVEL_HANDLER'
}

export type SettingsObject = {
  label: string
  description: string
  variants: {
    key: number
    label: string
    value: number
  }[]
  currentState: number
  reducerType: Handlers
}

export interface StateInterface {
    quantity: SettingsObject
    time: SettingsObject
    level: SettingsObject
}

export const initialState: StateInterface = {
  quantity: {
    label: 'quantity',
    description: 'Number of questions',
    variants: [
      { key: 0, label: '10', value: 10 },
      { key: 1, label: '20', value: 20 },
      { key: 2, label: '30', value: 30 },
      // { key: 3, label: 'custom', value: 0 }
    ],
    currentState: 0,
    reducerType: Handlers.QUANTITY_HANDLER
  },
  time: {
    label: 'time',
    description: 'Time',
    variants: [
      { key: 0, label: '10', value: 10 },
      { key: 1, label: '15', value: 15 },
      { key: 2, label: '20', value: 20 }
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
