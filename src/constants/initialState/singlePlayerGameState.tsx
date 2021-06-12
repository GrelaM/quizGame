import { State } from '../interface/game/gameState'

export const initialState: State = {
  nextQuestion: {
    category: '',
    number: 0,
    question: 'Loading...',
    hints: [],
    answers: [
      { code: -1, value: 'A' },
      { code: -1, value: 'B' },
      { code: -1, value: 'C' },
      { code: -1, value: 'D' }
    ],
    gameStatus: true
  },
  onDisplay: {
    hints: [],
    counter: 0
  },
  rounds: {
    game: 0,
    question: 0,
    answer: 0
  },
  toggleStart: {
    timerAndHints: false,
    nextQuestionReq: true,
    answerRes: false
  },
  chosenAnwserCode: -1
}
