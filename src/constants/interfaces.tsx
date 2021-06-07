export interface Question {
  Category: string
  Question: string
  Difficulty: number
  Hints: string[]
  Answers: {
    code: number
    value: string
  }[]
}

export interface QuestionObject {
  Category: string
  Question: string
  Difficulty: number
  Hint_1: string
  Hint_2: string
  Hint_3: string
  Correct: string
  Incorrect_1: string
  Incorrect_2: string
  Incorrect_3: string
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
  questionUpdate: Question
}
