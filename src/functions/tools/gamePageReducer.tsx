import { State, Handlers, initialState } from '../../pages/singleplayer/GamePage'

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

export const gamePageReducerFunction = (
  state: State,
  action: {
    type: Handlers
    value: string | number | boolean | NextQuestion
  }
): State => {
  switch (action.type) {
    case Handlers.COUNTER_HANDLER:
      return { ...state, counter: Number(action.value) }
    case Handlers.HINTS_HANDLER:
      return {
        ...state,
        displayedHints: state.displayedHints.concat(
          action.value ? action.value.toString() : ''
        )
      }
    case Handlers.QUESTION_UPDATE_HANDLER:
      return {
        ...state,
        nextQuestion: Object(action.value),
        shouldTimerAndHintsGoOn: true,
        deactivatedBtn: false
      }
    case Handlers.LOADING_HANDLER:
      return { ...state, loading: Boolean(action.value) }
    case Handlers.REQUESTING_QUESTION_HANDLER:
      return {
        ...state,
        displayedHints: [],
        counter: 0,
        shouldTimerAndHintsGoOn: false,
        nextQuestion: initialState.nextQuestion,
        shouldReqNextQuestion: Boolean(action.value),
        shouldSendRes: false,
        questionRounds: state.questionRounds + 1,
        deactivatedBtn: true
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
