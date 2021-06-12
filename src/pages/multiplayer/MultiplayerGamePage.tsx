import { useHistory } from 'react-router-dom'
import { useGameState } from '../../providers/GlobalStateProvider'
import { Handlers as GlobalHandlers } from '../../functions/tools/global/contextReducer'
import { useReducer, useEffect } from 'react'
import {
  initialState,
  multiplayerGameReducer,
  Handlers,
  GameMode
} from '../../functions/tools/multiplayer/multiplayerGameReducer'
import io from 'socket.io-client'
import SocketNames from '../../constants/socketNames'

import PageLayout from '../../components/layout/PageLayout'
import LoadingSpinner from '../../components/layout/LoadingSpinner'
import RoomStatusDisplay from '../../components/custom/multiplayer/RoomStatusDisplay'
import GameDisplay from '../../components/custom/multiplayer/GameDisplay'
import Results from '../../components/custom/multiplayer/Results'

import {
  onJoinSocketHandler,
  onPlayerUpdateSocketHandler,
  onGetReadySocketHandler,
  onQuestionHandler,
  onEndGameSocketHandler,
  onResultsHandler
} from '../../functions/connection/multiplayer/sockets/gamePageSockets'

import counterHandler from '../../functions/other/multiplayer/gamePage/counterHandler'
import hintsHandler from '../../functions/other/multiplayer/gamePage/hintsHandler'

let socket: any

const MultiplayerGamePage = () => {
  const history = useHistory()
  const [state, dispatch] = useReducer(multiplayerGameReducer, initialState)
  const [globalState, setGlobalState] = useGameState()
  const ENDPOINT = 'localhost:8080'

  useEffect(() => {
    setGlobalState({ type: GlobalHandlers.HEADER_HANDLER, value: 'quiz game' })
    socket = io(ENDPOINT)
    onJoinSocketHandler(
      socket,
      globalState.multiplayer.roomId,
      globalState.user.nickname
    )
    return () => {
      socket.disconnect()
      socket.off()
    }
  }, [
    globalState.multiplayer.roomId,
    globalState.user.nickname,
    globalState.multiplayer.gameId,
    setGlobalState
  ])

  useEffect(() => {
    onPlayerUpdateSocketHandler(socket, dispatch)
    onGetReadySocketHandler(socket, dispatch)
    onQuestionHandler(socket, dispatch, (message: string) =>
      setGlobalState({ type: GlobalHandlers.HEADER_HANDLER, value: message })
    )
    onEndGameSocketHandler(socket, dispatch)
    onResultsHandler(socket, dispatch)
    socket.on(SocketNames.FATAL_ERROR, () => history.push('/'))
  }, [setGlobalState, history])

  useEffect(() => {
    if (!state.game.counterState) return () => {}
    const timer = counterHandler(
      state.game.timer,
      state.question.Hints,
      dispatch
    )

    let hints = setTimeout(() => {}, 100)
    if (state.question.Hints.length > 0) {
      hints = hintsHandler(state.game.timer, state.question.Hints, dispatch)
    }

    return () => {
      clearInterval(timer)
      clearInterval(hints)
    }
  }, [
    state.game.timer,
    state.game.counterState,
    state.game.counterRounds,
    state.question.Hints
  ])

  const btnHandler = (answer: { code: number; value: string }) => {
    if (!state.game.btnState) return
    dispatch({ type: Handlers.BUTTON_HANDLER, value: answer.code })

    const data: {
      code: number
      hints: number
      roomId: string
      gameId: string
    } = {
      code: answer.code,
      hints: state.game.displayedHints.length,
      roomId: globalState.multiplayer.roomId,
      gameId: globalState.multiplayer.gameId
    }
    socket.emit(SocketNames.ANSWER, data)
  }

  const cleanSnackBarAlertHandler = () => {
    dispatch({ type: Handlers.CLEAN_ALERT_HANDLER })
  }

  let mode = (
    <RoomStatusDisplay
      headerDisplay={state.game.header}
      counter={state.game.counter}
      players={{ array: state.players.array, alert: state.players.alert }}
      playerAlertHandler={cleanSnackBarAlertHandler}
      noPlayersMessage={'Please wait for other players...'}
      roomName={globalState.multiplayer.roomId}
      roomState={true}
      resultsOnDisplay={false}
      resultsState={false}
      results={[]}
    />
  )
  if (state.game.mode === GameMode.GAME) {
    mode = (
      <GameDisplay
        answers={state.question.Answers}
        hints={state.game.displayedHints}
        question={state.question.Question}
        progress={state.game.counter}
        passedCode={state.game.chosenAnswer}
        btnHandler={(answer) => btnHandler(answer)}
      />
    )
  } else if (state.game.mode === GameMode.RESULTS) {
    mode = (
      <Results
        resultsState={state.finaleResults.resultsState}
        results={state.finaleResults.results}
        clickHandler={() => history.push('/')}
      />
    )
  }

  return (
    <PageLayout>
      {mode}
    </PageLayout>
  )
}

export default MultiplayerGamePage
