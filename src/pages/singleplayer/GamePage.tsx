import { useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalState } from '../../providers/StateProvider'
import { GlobalHandler } from '../../constants/interface/provider/globalHandler'
import { Answer } from '../../constants/interface/global/game'

import { gamePageReducer } from '../../functions/tools/singlePlayer/gamePageReducer'
import { initialState } from '../../constants/initialState/singlePlayerGameState'

import { hintsHandler } from '../../functions/other/singlePlayer/hintsHandler'
import { timeHandler } from '../../functions/other/singlePlayer/timeHandler'
import {
  fetchingData,
  uploadingAnswerData
} from '../../functions/other/singlePlayer/singleGameHandlers'

import PageLayout from '../../components/layout/PageLayout'
import QuestionCard from '../../components/custom/global/QuestionCard'
import BtnArena from '../../components/layout/GameBtnLayout'

const GamePage = () => {
  const history = useHistory()
  const [globalState, setGlobalState] = useGlobalState()
  const [state, dispatch] = useReducer(gamePageReducer, initialState)

  const time = globalState.game.timer ? globalState.game.timer : 0
  const gameId = globalState.game.gameId ? globalState.game.gameId : ''

  useEffect(() => {
    if (!state.toggleStart.nextQuestionReq) {
      setGlobalState({
        type: GlobalHandler.MENU_HANDLER,
        value: { header: 'WELL DONE!!!', activeState: true }
      })
      history.push('/result')
    } else {
      fetchingData(gameId, dispatch, setGlobalState)
    }
  }, [
    state.toggleStart.nextQuestionReq,
    state.rounds.question,
    gameId,
    history,
    setGlobalState
  ])

  useEffect(() => {
    if (!state.toggleStart.timerAndHints) return () => {}
    setGlobalState({
      type: GlobalHandler.SETTINGS_HANDLER,
      value: { toggleLoading: false, credentials: false }
    })
    setGlobalState({
      type: GlobalHandler.MENU_HANDLER,
      value: {
        header: `Question #${state.nextQuestion.number}`,
        activeState: true
      }
    })
    const hint = hintsHandler(time, state.nextQuestion.hints, dispatch)
    const timer = timeHandler(time, 0, dispatch)
    return () => {
      clearTimeout(hint)
      clearTimeout(timer)
    }
  }, [
    state.toggleStart.timerAndHints,
    state.rounds.game,
    setGlobalState,
    state.nextQuestion.hints,
    state.nextQuestion.number,
    gameId,
    time
  ])

  useEffect(() => {
    if (!state.toggleStart.answerRes) return () => {}
    const nextQuestionNumber = state.nextQuestion.number - 1
    uploadingAnswerData(
      gameId,
      nextQuestionNumber,
      { code: -1, value: '' },
      dispatch,
      setGlobalState,
      state.nextQuestion.gameStatus
    )
  }, [
    state.toggleStart.answerRes,
    state.rounds.answer,
    state.nextQuestion.number,
    state.nextQuestion.gameStatus,
    gameId,
    setGlobalState
  ])

  // BTN METHOD
  const responseHandler = (answer: Answer) => {
    if (state.chosenAnwserCode !== -1) return
    const nextQuestionNumber = state.nextQuestion.number - 1
    uploadingAnswerData(
      gameId,
      nextQuestionNumber,
      answer,
      dispatch,
      setGlobalState,
      state.nextQuestion.gameStatus
    )
  }

  return (
    <PageLayout>
      <QuestionCard
        question={state.nextQuestion.question}
        hints={state.onDisplay.hints}
        progress={state.onDisplay.counter}
      />
      <BtnArena
        answers={state.nextQuestion.answers}
        passedCode={state.chosenAnwserCode}
        btnHandler={(answer) => responseHandler(answer)}
      />
    </PageLayout>
  )
}

export default GamePage
