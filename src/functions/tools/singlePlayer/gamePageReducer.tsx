import { Handlers } from '../../../constants/interface/game/gameHandler'
import { Action } from '../../../constants/interface/game/gameAction'
import { State } from '../../../constants/interface/game/gameState'
import { initialState } from '../../../constants/initialState/singlePlayerGameState'

export const gamePageReducer = (
  state: State,
  action: Action
): State => {
  switch (action.type) {
    case Handlers.COUNTER_HANDLER:
      return {
        ...state,
        onDisplay: { ...state.onDisplay, counter: action.value }
      }
    case Handlers.HINTS_HANDLER:
      return {
        ...state,
        onDisplay: {
          ...state.onDisplay,
          hints: state.onDisplay.hints.concat(action.value)
        }
      }
    case Handlers.QUESTION_UPDATE_HANDLER:
      return {
        ...state,
        nextQuestion: action.value,
        toggleStart: {
          ...state.toggleStart,
          timerAndHints: true
        },
        chosenAnwserCode: -1
      }
    case Handlers.REQUESTING_QUESTION_HANDLER:
      return {
        ...state,
        nextQuestion: initialState.nextQuestion,
        onDisplay: {
          hints: [],
          counter: 0
        },
        toggleStart: {
          nextQuestionReq: action.value,
          timerAndHints: false,
          answerRes: false
        },
        rounds: {
          ...state.rounds,
          question: state.rounds.question + 1
        },
        chosenAnwserCode: -1
      }
    case Handlers.UPLOADING_ANSWER_HANDLER:
      return {
        ...state,
        onDisplay: {
          ...state.onDisplay,
          counter: 0
        },
        toggleStart: {
          ...state.toggleStart,
          answerRes: true
        },
        rounds: {
          ...state.rounds,
          answer: action.value ? state.rounds.answer + 1 : state.rounds.answer
        }
      }
    default:
      return { ...state }
  }
}
