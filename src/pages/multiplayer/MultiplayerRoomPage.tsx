import { useReducer, useEffect } from 'react'
import { useGameState } from '../../providers/GameStateProvider'
import {
  multiplayerRoomReducer,
  initialState,
  Handlers
} from '../../functions/tools/multiplayer/multiplayerRoomReducer'
import SocketNames from '../../constants/socketNames'
import io from 'socket.io-client'

import PageLayout from '../../components/chakra/components/layout/PageLayout'
import Header from '../../components/chakra/components/custom/Header'
import Alert from '../../components/chakra/components/events/Alert'
import RoomStatusDislpay from '../../components/chakra/components/layout/multiplayer/RoomStatusDisplay'

import counterHandler from '../../functions/other/multiplayer/roomPage/counterHandler'

import {
  hostSocketHandler,
  playersUpdateSocketHandler,
  counterSocketHandler,
  questionHostSocketHandler,
  onDisplayResultSocketHandler,
  onResultsHandler
} from '../../functions/connection/multiplayer/sockets/roomPageSockets'
import RoomBtnDisplay from '../../components/chakra/components/layout/multiplayer/RoomBtnDisplay'

let socket: any

const MultiplayerRoom = ({ location }: any) => {
  const [globalState, setGlobalState] = useGameState()
  const [state, dispatch] = useReducer(multiplayerRoomReducer, initialState)
  const ENDPOINT = 'localhost:8080'

  const roomId = globalState.roomId
  const gameId = globalState.gameId

  // HOST GAME
  useEffect(() => {
    const data = {
      gameId: gameId,
      roomId: roomId
    }
    socket = io(ENDPOINT)
    hostSocketHandler(socket, data, dispatch)
    setGlobalState((cur) => ({ ...cur, header: 'host' }))

    return () => {
      socket.emit(SocketNames.SOCKET_DISCONNECT)
      socket.off()
    }
  }, [location.search, roomId, gameId, setGlobalState])

  useEffect(() => {
    playersUpdateSocketHandler(socket, dispatch)
    counterSocketHandler(socket, dispatch)
    questionHostSocketHandler(socket, dispatch)
    onDisplayResultSocketHandler(socket, dispatch)
    onResultsHandler(socket, dispatch)
  }, [])

  useEffect(() => {
    if (!state.counter.counterStatus) return () => {}
    const timer = counterHandler(state.headerDisplay, state.timer, dispatch)

    return () => {
      clearInterval(timer)
    }
  }, [
    state.counter.counterStatus,
    state.counter.updateRound,
    state.headerDisplay,
    state.timer
  ])

  const startGameHandler = () => {
    dispatch({ type: Handlers.START_GAME_REQ_HANDLER, value: true })
    const data = { roomId, gameId }
    socket.emit(SocketNames.START_GAME, data)
  }

  const cleanSnackBarAlertHandler = () => {
    dispatch({ type: Handlers.CLEAN_SNACKBAR_HANDLER })
  }

  const shareHandler = () => {
    const roomId = globalState.roomId.substring(1)
    const urlLink = `http://localhost:3000/join?roomid=${roomId}&gameid=${gameId}`
    navigator.clipboard.writeText(urlLink)
    dispatch({
      type: Handlers.ALERT_HANDLER,
      value: {
        type: 'success',
        title: 'Success',
        message: 'Copied to clipboard.',
        status: true
      }
    })
  }

  return (
    <PageLayout>
      <Header />
      <RoomStatusDislpay
        roomState={state.roomState}
        roomName={globalState.roomId}
        headerDisplay={state.headerDisplay}
        playersArray={state.players}
        counter={state.counter.currentValue}
        resultsOnDisplay={state.finaleResults.resultsOnDisplay}
        resultsState={state.finaleResults.resultsState}
        results={state.finaleResults.results}
      />
      <RoomBtnDisplay
        shareLinkBtnDisabled={state.startGameReq}
        shareLinkGameBtnHandler={shareHandler}
        startGameBtnDisabled={state.startGameReq}
        startGameBtnHandler={startGameHandler}
      />
      {state.alert.status ? (
        <Alert
          type={state.alert.type}
          title={state.alert.title}
          message={state.alert.message}
          alertHandler={cleanSnackBarAlertHandler}
        />
      ) : null}
    </PageLayout>
  )
}

export default MultiplayerRoom
