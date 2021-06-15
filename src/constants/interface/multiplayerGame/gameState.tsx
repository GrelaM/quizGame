import { QuestionMultiplayer, GameMode } from '../global/game'

export interface MultiplayerGameState {
  players: string[]
  game: {
    header: string
    mode: GameMode
    displayedHints: string[]
    timer: number
    counter: number
    counterState: boolean
    counterRounds: number
    chosenAnswer: number
    btnState: boolean
  }
  question: QuestionMultiplayer
  finaleResults: {
    resultsState: boolean
    results: {
      name: string
      correctAnswers: number
      totalQuestions: number
      points: number
    }[]
  }
}
