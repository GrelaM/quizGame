import { Handlers } from '../../../constants/interface/multiplayerRoom/roomHandler'
import { Action } from '../../../constants/interface/multiplayerRoom/roomAction'
import { MultiplayerRoomState } from '../../../constants/interface/multiplayerRoom/roomState'

export const multiplayerRoomReducer = (
  state: MultiplayerRoomState,
  action: Action
): MultiplayerRoomState => {
  switch (action.type) {
    case Handlers.ON_OPEN_ROOM_HANDLER:
      return {
        ...state,
        headerDisplay: action.value ? 'active' : 'not active',
        roomState: action.value
      }
    case Handlers.UPDATE_PLAYERS_HANDLERS:
      return {
        ...state,
        players: action.value
      }
    case Handlers.START_GAME_REQ_HANDLER:
      return { ...state, startGameReq: action.value }
    case Handlers.HEADER_DISPLAY_HANDLER:
      return { ...state, headerDisplay: action.value }
    case Handlers.COUNTER_HANDLER:
      return {
        ...state,
        counter: {
          ...state.counter,
          currentValue: action.value.currentValue,
          counterStatus: action.value.counterStatus
        }
      }
    case Handlers.COUNTER_STATUS_HANDLER:
      return {
        ...state,
        counter: { ...state.counter, counterStatus: action.value }
      }
    case Handlers.COUNTER_ROUND_HANDLER:
      return {
        ...state,
        counter: {
          ...state.counter,
          updateRound: action.value
            ? state.counter.updateRound + 1
            : state.counter.updateRound
        }
      }
    case Handlers.SOCKET_GET_READY_HANDLER:
      return {
        ...state,
        headerDisplay: action.value.message,
        timer: action.value.counter,
        counter: {
          ...state.counter,
          counterStatus: true,
          updateRound: state.counter.updateRound + 1
        }
      }
    case Handlers.SOCKET_HOST_QUESTION_HANDLER:
      return {
        ...state,
        headerDisplay: action.value.header,
        timer: action.value.timer,
        nextQuestion: action.value.nextQuestion,
        counter: {
          ...state.counter,
          counterStatus: true,
          updateRound: state.counter.updateRound + 1
        }
      }
    case Handlers.RESULTS_ON_DISPLAY_HANDLER:
      return {
        ...state,
        timer: 0,
        counter: {
          currentValue: 0, 
          counterStatus: false,
          updateRound: state.counter.updateRound + 1
        },
        finaleResults: {
          ...state.finaleResults,
          resultsOnDisplay: action.value
        }
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
      return state
  }
}
