import { MultiplayerGameState } from '../interface/multiplayerGame/gameState'
import { GameMode } from '../interface/global/game'

export const initialState: MultiplayerGameState = {
  players: [],
  game: {
    header: 'Please wait...',
    mode: GameMode.WAIT,
    displayedHints: [],
    timer: 0,
    counter: 0,
    counterState: false,
    counterRounds: 0,
    chosenAnswer: -1,
    btnState: false
  },
  question: {
    category: '',
    difficulty: 0,
    hints: [],
    answers: [
      { code: 1, value: 'A' },
      { code: 2, value: 'B' },
      { code: 3, value: 'C' },
      { code: 4, value: 'D' }
    ],
    question: 'Loading...'
  },
  finaleResults: {
    resultsState: false,
    results: []
  }
}
