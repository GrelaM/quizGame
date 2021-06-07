import { useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { useGameState } from '../../providers/GlobalStateProvider'
import { Handlers as GlobalHandlers } from '../../functions/tools/global/contextReducer'
import { LocalStorage } from '../../constants/localStorage'

import {
  gamePageReducerFunction,
  Handlers,
  initialState,
  Answer
} from '../../functions/tools/singlePlayer/gamePageReducer'
import { hintsHandler } from '../../functions/other/singlePlayer/hintsHandler'
import { timeHandler } from '../../functions/other/singlePlayer/timeHandler'
import {
  fetchingData,
  uploadingAnswerData,
  errorHandler
} from '../../functions/other/singlePlayer/singleGameHandlers'

import PageLayout from '../../components/layout/PageLayout'
import QuestionCard from '../../components/custom/global/QuestionCard'
import BtnArena from '../../components/layout/GameBtnLayout'
import LoadingSpinner from '../../components/layout/LoadingSpinner'

const GamePage = () => {
  const history = useHistory()
  const [useGlobalState, setUseGlobalState] = useGameState()
  const [state, dispatch] = useReducer(gamePageReducerFunction, initialState)

  const time = useGlobalState.currentGameInfo.timer
  const gameId = useGlobalState.singleGame.gameId

  useEffect(() => {
    if (!state.shouldReqNextQuestion) {
      setUseGlobalState({
        type: GlobalHandlers.HEADER_HANDLER,
        value: 'WELL DONE!!!'
      })
      history.push('/result')
    } else {
      fetchingData(gameId, dispatch, setUseGlobalState)
    }
  }, [
    state.shouldReqNextQuestion,
    state.questionRounds,
    gameId,
    history,
    setUseGlobalState
  ])

  useEffect(() => {
    if (!state.shouldTimerAndHintsGoOn) return () => {}
    dispatch({ type: Handlers.LOADING_HANDLER, value: false })
    setUseGlobalState({
      type: GlobalHandlers.HEADER_HANDLER,
      value: `Question #${state.nextQuestion.questionNumber}`
    })
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
      setUseGlobalState,
      state.nextQuestion.gameStatus
    )
  }, [
    state.shouldSendRes,
    state.resRounds,
    state.nextQuestion.questionNumber,
    state.nextQuestion.gameStatus,
    gameId,
    setUseGlobalState
  ])

  // BTN METHOD
  const responseHandler = (answer: Answer) => {
    if (state.chosenAnwserCode !== -1) return
    const nextQuestionNumber = state.nextQuestion.questionNumber - 1
    uploadingAnswerData(
      gameId,
      nextQuestionNumber,
      answer,
      dispatch,
      setUseGlobalState,
      state.nextQuestion.gameStatus
    )
  }

  const errorHandlerCallback = () => {
    localStorage.removeItem(LocalStorage.SINGLE_GAME)
    history.push('/')
  }

  return (
    <PageLayout
      toggleAlert={state.toggleAlert}
      alertTimer={5000}
      alertHandler={() => errorHandler(dispatch, setUseGlobalState, errorHandlerCallback)}
    >
      <QuestionCard
        question={state.nextQuestion.question}
        hints={state.displayedHints}
        progress={state.counter}
      />
      <BtnArena
        answers={state.nextQuestion.answers}
        passedCode={state.chosenAnwserCode}
        btnHandler={(answer) => responseHandler(answer)}
      />
      <LoadingSpinner toggleSpinner={state.loading} />
    </PageLayout>
  )
}

export default GamePage
