export interface State {
  toggleAlert: boolean
  nextQuestion: {
    category: string
    questionNumber: number
    question: string
    hints: string[]
    answers: {
      code: number
      value: string
    }[]
    gameStatus: boolean
  }
  displayedHints: string[]
  counter: number
  shouldTimerAndHintsGoOn: boolean
  gameRounds: number
  shouldReqNextQuestion: boolean
  questionRounds: number
  shouldSendRes: boolean
  resRounds: number
  loading: boolean
  chosenAnwserCode: number
}

export type Answer = { code: number; value: string }

export enum Handlers {
  TOGGLE_ALERT_HANDLER = 'TOGGLE_ALERT_HANDLER',
  COUNTER_HANDLER = 'COUNTER_HANDLER',
  HINTS_HANDLER = 'HINTS_HANDLER',
  QUESTION_UPDATE_HANDLER = 'QUESTION_UPDATE_HANDLER',
  LOADING_HANDLER = 'LOADING_HANDLER',
  UPLOADING_ANSWER_HANDLER = 'UPLOADING_ANSWER_HANDLER',
  REQUESTING_QUESTION_HANDLER = 'REQUESTING_QUESTION_HANDLER'
}

export const initialState: State = {
  toggleAlert: false,
  nextQuestion: {
    category: '',
    questionNumber: 0,
    question: 'Loading...',
    hints: [],
    answers: [
      { code: -1, value: 'A' },
      { code: -1, value: 'B' },
      { code: -1, value: 'C' },
      { code: -1, value: 'D' }
    ],
    gameStatus: true
  },
  displayedHints: [],
  counter: 0,
  shouldTimerAndHintsGoOn: false,
  gameRounds: 0,
  shouldReqNextQuestion: true,
  questionRounds: 0,
  shouldSendRes: false,
  resRounds: 0,
  loading: false,
  chosenAnwserCode: -1
}

type NextQuestion = {
  nextQuestion: {
    category: string
    questionNumber: number
    question: string
    hints: string[]
    answers: {
      code: number
      value: string
    }[]
    gameStatus: boolean
  }
}

export type Action =
  | {
      type: Handlers.TOGGLE_ALERT_HANDLER
      value: boolean
    }
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
      value: NextQuestion
    }
  | {
      type: Handlers.LOADING_HANDLER
      value: boolean
    }
  | {
      type: Handlers.REQUESTING_QUESTION_HANDLER
      value: boolean
    }
  | {
      type: Handlers.UPLOADING_ANSWER_HANDLER
      value: boolean
    }

export const gamePageReducerFunction = (
  state: State,
  action: Action
): State => {
  switch (action.type) {
    case Handlers.TOGGLE_ALERT_HANDLER:
      return { ...state, toggleAlert: action.value }
    case Handlers.COUNTER_HANDLER:
      return { ...state, counter: action.value }
    case Handlers.HINTS_HANDLER:
      return {
        ...state,
        displayedHints: state.displayedHints.concat(action.value)
      }
    case Handlers.QUESTION_UPDATE_HANDLER:
      return {
        ...state,
        nextQuestion: Object(action.value),
        shouldTimerAndHintsGoOn: true,
        chosenAnwserCode: -1
      }
    case Handlers.LOADING_HANDLER:
      return { ...state, loading: action.value }
    case Handlers.REQUESTING_QUESTION_HANDLER:
      return {
        ...state,
        displayedHints: [],
        counter: 0,
        shouldTimerAndHintsGoOn: false,
        nextQuestion: initialState.nextQuestion,
        shouldReqNextQuestion: action.value,
        shouldSendRes: false,
        questionRounds: state.questionRounds + 1,
        chosenAnwserCode: -1
      }
    case Handlers.UPLOADING_ANSWER_HANDLER:
      return {
        ...state,
        counter: 0,
        shouldSendRes: true,
        resRounds: action.value ? state.resRounds + 1 : state.resRounds
      }
    default:
      return state
  }
}
