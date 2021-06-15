import { MultiplayerRoomState } from '../interface/multiplayerRoom/roomState'

export const initialState: MultiplayerRoomState = {
  roomState: false,
  gameState: false,
  startGameReq: false,
  headerDisplay: 'Please wait...',
  players: [],
  timer: 0,
  leftQuestions: 0,
  counter: {
    currentValue: 0,
    counterStatus: false,
    updateRound: 0
  },
  finaleResults: {
    resultsOnDisplay: false,
    resultsState: false,
    results: []
  }
}
