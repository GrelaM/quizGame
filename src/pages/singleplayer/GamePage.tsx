import { useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useGameState } from '../../providers/GameStateProvider'

import { gamePageReducerFunction } from '../../functions/tools/gamePageReducer'
import { hintsHandler } from '../../functions/other/hintsHandler'
import { timeHandler } from '../../functions/other/timeHandler'
import {
  fetchingData,
  uploadingAnswerData
} from '../../functions/other/singleGameHandlers'

import LoadingSpinner from '../../components/general/LoadingSpinner'
import QuestionCard from '../../components/general/QuestionCard'
import GameButton from '../../components/general/GameButton'

export interface State {
  nextQuestion: {
    category: string
    questionNumber: number
    question: string
    hints: string[]
    answers: {
      code: number
      value: string
    }[]
    gameStatus: boolean
  }
  displayedHints: string[]
  counter: number
  shouldTimerAndHintsGoOn: boolean
  gameRounds: number
  shouldReqNextQuestion: boolean
  questionRounds: number
  shouldSendRes: boolean
  resRounds: number
  loading: boolean
  deactivatedBtn: boolean
}

export type Answer = { code: number; value: string }

export enum Handlers {
  COUNTER_HANDLER = 'COUNTER_HANDLER',
  HINTS_HANDLER = 'HINTS_HANDLER',
  QUESTION_UPDATE_HANDLER = 'QUESTION_UPDATE_HANDLER',
  LOADING_HANDLER = 'LOADING_HANDLER',
  UPLOADING_ANSWER_HANDLER = 'UPLOADING_ANSWER_HANDLER',
  REQUESTING_QUESTION_HANDLER = 'REQUESTING_QUESTION_HANDLER'
}

export const initialState: State = {
  nextQuestion: {
    category: '',
    questionNumber: 0,
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
  displayedHints: [],
  counter: 0,
  shouldTimerAndHintsGoOn: false,
  gameRounds: 0,
  shouldReqNextQuestion: true,
  questionRounds: 0,
  shouldSendRes: false,
  resRounds: 0,
  loading: true,
  deactivatedBtn: false
}

const GamePage = () => {
  const classes = useStyles()
  const history = useHistory()
  const [useGlobalState, setUseGlobalState] = useGameState()
  const [state, dispatch] = useReducer(gamePageReducerFunction, initialState)

  const time = useGlobalState.timer
  const gameId = useGlobalState.gameId

  useEffect(() => {
    if (!state.shouldReqNextQuestion) {
    //   console.log('THE END')
      setUseGlobalState(cur => ({...cur, header: 'WELL DONE!!!'}))
      history.push('/result')
    } else {
      fetchingData(gameId, dispatch)
    }
  }, [state.shouldReqNextQuestion, state.questionRounds, gameId, history, setUseGlobalState])

  useEffect(() => {
    if (!state.shouldTimerAndHintsGoOn) return () => {}
    dispatch({ type: Handlers.LOADING_HANDLER, value: false })
    setUseGlobalState(cur => ({...cur, header: `Question #${state.nextQuestion.questionNumber}`}))
    const hint = hintsHandler(time, state.nextQuestion.hints, dispatch)
    const timer = timeHandler(time, 0, dispatch)
    return () => {
      clearTimeout(hint)
      clearTimeout(timer)
    }
  }, [
    setUseGlobalState,
    state.gameRounds,
    state.shouldTimerAndHintsGoOn,
    state.nextQuestion.hints,
    state.nextQuestion.questionNumber,
    gameId,
    time
  ])

  useEffect(() => {
    if (!state.shouldSendRes) return () => {}
    const nextQuestionNumber = state.nextQuestion.questionNumber - 1
    uploadingAnswerData(
      gameId,
      nextQuestionNumber,
      { code: -1, value: '' },
      dispatch,
      state.nextQuestion.gameStatus
    )
  }, [
    state.shouldSendRes,
    state.resRounds,
    state.nextQuestion.questionNumber,
    state.nextQuestion.gameStatus,
    gameId
  ])

  // BTN METHOD
  const responseHandler = (answer: Answer) => {
    const nextQuestionNumber = state.nextQuestion.questionNumber - 1
    uploadingAnswerData(
      gameId,
      nextQuestionNumber,
      answer,
      dispatch,
      state.nextQuestion.gameStatus
    )
  }

  return (
    <div className={classes.root}>
      <QuestionCard
        question={state.nextQuestion.question}
        hints={state.displayedHints}
        progressCounter={state.counter}
      />
      <div className={classes.btnArea}>
        {state.nextQuestion.answers.map((el: Answer, index: number) => {
          return (
            <GameButton
              key={index}
              title={el.value}
              notActive={state.deactivatedBtn}
              onBtnClick={() => responseHandler(el)}
            />
          )
        })}
      </div>
      {state.loading ? <LoadingSpinner /> : null}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexGrow: 1,
    padding: 5,
    margin: 'auto'
  },
  textArea: {
    color: theme.palette.text.primary
  },
  btnArea: {
    width: '90%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    '@media only screen and (min-width: 750px)': {
      justifyContent: 'space-between',
      width: '100%'
    }
  }
}))

export default GamePage
