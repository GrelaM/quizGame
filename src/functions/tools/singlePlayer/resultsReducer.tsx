interface ResultsInitialState {
  gameResults: {
    points: number
    correctAnswers: number
    questionQuantity: number
  }
  isLoading: boolean
  toggleAlert: boolean
}

export const initialState: ResultsInitialState = {
  gameResults: {
    points: 0,
    correctAnswers: 0,
    questionQuantity: 0
  },
  isLoading: true,
  toggleAlert: false
}

export enum Handlers {
  RESULT_HANDLER = 'RESULT_HANDLER',
  IS_LOADING_HANDLER = 'IS_LOADING_HANDLER',
  TOGGLE_ALERT_HANDLER = 'TOGGLE_ALERT_HANDLER'
}

export type Action =
  | {
      type: Handlers.RESULT_HANDLER
      value: {
        message: string
        points: number
        givenCorrectAnswers: number
        questions: number
      }
    }
  | {
      type: Handlers.IS_LOADING_HANDLER
      value: boolean
    }
  | {
      type: Handlers.TOGGLE_ALERT_HANDLER
      value: boolean
    }

export const resultReducer = (
  state: ResultsInitialState,
  action: Action
): ResultsInitialState => {
  switch (action.type) {
    case Handlers.RESULT_HANDLER:
      return {
        ...state,
        gameResults: {
          points: action.value.points,
          correctAnswers: action.value.givenCorrectAnswers,
          questionQuantity: action.value.questions
        },
        isLoading: false
      }
    case Handlers.IS_LOADING_HANDLER:
      return { ...state, isLoading: action.value }
    case Handlers.TOGGLE_ALERT_HANDLER:
      return { ...state, toggleAlert: action.value }
    default:
      return { ...state }
  }
}
