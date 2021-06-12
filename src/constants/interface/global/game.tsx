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
