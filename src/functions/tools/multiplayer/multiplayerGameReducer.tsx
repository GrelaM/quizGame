import { GameMode } from '../../../constants/interface/global/game'

import { Handlers } from '../../../constants/interface/multiplayerGame/gameHandler'
import { Action } from '../../../constants/interface/multiplayerGame/gameAction'
import { MultiplayerGameState } from '../../../constants/interface/multiplayerGame/gameState'

export const multiplayerGameReducer = (
  state: MultiplayerGameState,
  action: Action
): MultiplayerGameState => {
  switch (action.type) {
    case Handlers.UPDATE_PLAYERS_HANDLERS:
      return {
        ...state,
        players: action.value
      }
    case Handlers.BUTTON_HANDLER:
      return {
        ...state,
        game: { ...state.game, chosenAnswer: action.value, btnState: false }
      }
    case Handlers.HEADER_HANDLER:
      return {
        ...state,
        question: { ...state.question, question: action.value }
      }
    case Handlers.ON_GET_READY_SOCKET_HANDLER:
      return {
        ...state,
        question: { ...state.question, question: action.value.message },
        game: {
          ...state.game,
          timer: action.value.counter,
          mode: GameMode.GAME,
          counterState: true,
          counterRounds: state.game.counterRounds + 1
        }
      }
    case Handlers.COUNTER_HANDLER:
      return {
        ...state,
        game: {
          ...state.game,
          counter: action.value.currentValue,
          counterState: action.value.counterStatus
        }
      }
    case Handlers.HINTS_HANDLER:
      return {
        ...state,
        game: {
          ...state.game,
          displayedHints: state.game.displayedHints.concat(action.value)
        }
      }
    case Handlers.ON_QUESTION_SOCKET_HANDLER:
      return {
        ...state,
        question: action.value.questionUpadate,
        game: {
          ...state.game,
          displayedHints: [],
          header: action.value.message,
          timer: action.value.playerUpadate.timer,
          chosenAnswer: -1,
          btnState: true,
          counterState: true,
          counterRounds: state.game.counterRounds + 1
        }
      }
    case Handlers.RESULTS_ON_DISPLAY_HANDLER:
      return {
        ...state,
        game: { ...state.game, mode: action.value }
      }
    case Handlers.RESULTS_HANDLER:
      return {
        ...state,
        finaleResults: {
          ...state.finaleResults,
          resultsState: action.value.state,
          results: action.value.results
        }
      }
    default:
      return { ...state }
  }
}
