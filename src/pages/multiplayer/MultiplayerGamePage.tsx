import { useReducer, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalState } from '../../providers/StateProvider'
import { GlobalHandler } from '../../constants/interface/provider/globalHandler'
import { multiplayerGameReducer } from '../../functions/tools/multiplayer/multiplayerGameReducer'
import { Handlers } from '../../constants/interface/multiplayerGame/gameHandler'
import { initialState } from '../../constants/initialState/multiplayerGame'
import { GameMode } from '../../constants/interface/global/game'
import io from 'socket.io-client'
import SocketNames from '../../constants/socketNames'

import PageLayout from '../../components/layout/PageLayout'
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
  const [globalState, setGlobalState] = useGlobalState()
  const ENDPOINT = 'localhost:8080'
  let roomId: string = ''

  if (globalState.game.roomId !== '' && globalState.game.roomId !== undefined) {
    roomId = globalState.game.roomId
  } else {
    ;(() => history.push('/hosting'))()
  }

  useEffect(() => {
    setGlobalState({
      type: GlobalHandler.MENU_HANDLER,
      value: { header: 'quiz game', activeState: true }
    })
    socket = io(ENDPOINT)

    onJoinSocketHandler(socket, roomId, globalState.user.nickname)
    return () => {
      socket.disconnect()
      socket.off()
    }
  }, [roomId, globalState.user.nickname, setGlobalState])

  useEffect(() => {
    onPlayerUpdateSocketHandler(socket, dispatch, setGlobalState)
    onGetReadySocketHandler(socket, dispatch)
    onQuestionHandler(socket, dispatch, setGlobalState)
    onEndGameSocketHandler(socket, dispatch, setGlobalState)
    onResultsHandler(socket, dispatch)
    socket.on(SocketNames.FATAL_ERROR, () => history.push('/'))
  }, [setGlobalState, history])

  useEffect(() => {
    if (!state.game.counterState) return () => {}
    const timer = counterHandler(
      state.game.timer,
      state.question.hints,
      dispatch,
      setGlobalState
    )

    let hints = setTimeout(() => {}, 100)
    if (state.question.hints.length > 0) {
      hints = hintsHandler(state.game.timer, state.question.hints, dispatch)
    }

    return () => {
      clearInterval(timer)
      clearInterval(hints)
    }
  }, [
    state.game.timer,
    state.game.counterState,
    state.game.counterRounds,
    state.question.hints,
    setGlobalState
  ])

  const btnHandler = (answer: { code: number; value: string }) => {
    if (!state.game.btnState) return
    dispatch({ type: Handlers.BUTTON_HANDLER, value: answer.code })

    const data: {
      code: number
      hints: number
      roomId: string
    } = {
      code: answer.code,
      hints: state.game.displayedHints.length,
      roomId: roomId
    }
    socket.emit(SocketNames.ANSWER, data)
  }

  let mode = (
    <RoomStatusDisplay
      headerDisplay={state.game.header}
      counter={state.game.counter}
      players={state.players}
      noPlayersMessage={'Please wait for other players...'}
      roomName={roomId}
      roomState={true}
      resultsOnDisplay={false}
      resultsState={false}
      results={[]}
    />
  )
  if (state.game.mode === GameMode.GAME) {
    mode = (
      <GameDisplay
        answers={state.question.answers}
        hints={state.game.displayedHints}
        question={state.question.question}
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

  return <PageLayout>{mode}</PageLayout>
}

export default MultiplayerGamePage
