import { QuestionMultiplayer } from '../global/game'

export interface MultiplayerRoomState {
  roomState: boolean
  gameState: boolean
  startGameReq: boolean
  headerDisplay: string
  players: string[]
  timer: number
  leftQuestions: number
  nextQuestion?: QuestionMultiplayer
  counter: {
    currentValue: number
    counterStatus: boolean
    updateRound: number
  }
  finaleResults: {
    resultsOnDisplay: boolean
    resultsState: boolean
    results: {
      name: string
      correctAnswers: number
      totalQuestions: number
      points: number
    }[]
  }
}
