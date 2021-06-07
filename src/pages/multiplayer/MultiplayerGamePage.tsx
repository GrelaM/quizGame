import { useHistory } from 'react-router-dom'
import { useGameState } from '../../providers/GameStateProvider'
import { useReducer, useEffect } from 'react'
import {
  initialState,
  multiplayerGameReducer,
  Handlers,
  GameMode
} from '../../functions/tools/multiplayer/multiplayerGameReducer'
import io from 'socket.io-client'
import SocketNames from '../../constants/socketNames'

import PageLayout from '../../components/chakra/components/layout/PageLayout'
import Header from '../../components/chakra/components/custom/Header'
import Alert from '../../components/chakra/components/events/Alert'
import RoomStatusDisplay from '../../components/chakra/components/layout/multiplayer/RoomStatusDisplay'
import GameDisplay from '../../components/chakra/components/layout/multiplayer/GameDisplay'
import LoadingSpinner from '../../components/chakra/components/layout/LoadingSpinner'

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
import Results from '../../components/chakra/components/layout/multiplayer/Results'

let socket: any

const MultiplayerGamePage = () => {
  const history = useHistory()
  const [state, dispatch] = useReducer(multiplayerGameReducer, initialState)
  const [globalState, setGlobalState] = useGameState()
  const ENDPOINT = 'localhost:8080'

  useEffect(() => {
    setGlobalState((cur) => ({ ...cur, header: `quiz game` }))
    socket = io(ENDPOINT)
    onJoinSocketHandler(
      socket,
      globalState.roomId,
      globalState.nickname,
      globalState.gameId
    )
    return () => {
      socket.emit(SocketNames.SOCKET_DISCONNECT)
      socket.off()
    }
  }, [
    globalState.roomId,
    globalState.nickname,
    globalState.gameId,
    setGlobalState
  ])

  useEffect(() => {
    onPlayerUpdateSocketHandler(socket, dispatch)
    onGetReadySocketHandler(socket, dispatch)
    onQuestionHandler(socket, dispatch, (message: string) =>
      setGlobalState((cur) => ({ ...cur, header: message }))
    )
    onEndGameSocketHandler(socket, dispatch)
    onResultsHandler(socket, dispatch)
  }, [setGlobalState])

  useEffect(() => {
    if (!state.game.counterState) return () => {}
    const timer = counterHandler(
      state.game.timer,
      state.question.Hints,
      dispatch
    )
    let hints = setInterval(() => {}, 100)

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
      roomId: globalState.roomId,
      gameId: globalState.gameId
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
      playersArray={state.players}
      roomName={globalState.roomId}
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
      <Header />
      {mode}
      {state.alert.status ? (
        <Alert
          type={state.alert.type}
          title={state.alert.title}
          message={state.alert.message}
          alertHandler={cleanSnackBarAlertHandler}
        />
      ) : null}
      {state.onLoading ? <LoadingSpinner /> : null}
    </PageLayout>
  )
}

export default MultiplayerGamePage
