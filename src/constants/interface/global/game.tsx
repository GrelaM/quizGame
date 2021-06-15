export type Question = {
  gameStatus: boolean
  number: number
  category: string
  question: string
  hints: string[]
  answers: {
    code: number
    value: string
  }[]
}

export interface QuestionMultiplayer {
  category: string
  question: string
  difficulty: number
  hints: string[]
  answers: {
    code: number
    value: string
  }[]
}

export type Answer = {
  code: number
  value: string
}

export type SinglePlayerLocalStorage = {
  user: string
  gameSettings: {
    artificialGameId: string
    gameId: string
    message: string
    timer: number
  }
}

export interface QuestionPayload {
  host: {
    roomId: string
    timer: number
    questionsLeft: number
  }
  playerData: {
    roomId: string
    timer: number
    questionNumber: number
    totalQuestions: number
  }
  questionUpdate: QuestionMultiplayer
}

export enum GameMode {
  WAIT = 'WAIT',
  GAME = 'GAME',
  RESULTS = 'RESULTS'
}