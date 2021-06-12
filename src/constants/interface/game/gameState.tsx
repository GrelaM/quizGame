import { Question } from '../global/game'

export interface State {
  nextQuestion: Question
  onDisplay: {
    hints: string[]
    counter: number
  }
  rounds: {
    game: number
    question: number
    answer: number
  }
  toggleStart: {
    timerAndHints: boolean
    nextQuestionReq: boolean
    answerRes: boolean
  }
  chosenAnwserCode: number
}
