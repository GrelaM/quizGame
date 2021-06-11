import { useReducer, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useGameState } from '../../providers/GlobalStateProvider'
import { Handlers as GlobalHandlers } from '../../functions/tools/global/contextReducer'
import {
  multiplayerRoomReducer,
  initialState,
  Handlers
} from '../../functions/tools/multiplayer/multiplayerRoomReducer'
import SocketNames from '../../constants/socketNames'
import io from 'socket.io-client'

import PageLayout from '../../components/layout/PageLayout'
import BtnDisplay from '../../components/layout/multiplayer/RoomBtnDisplay'
import Alert from '../../components/events/UpdateAlertBox'
import RoomStatusDislpay from '../../components/custom/multiplayer/RoomStatusDisplay'

import counterHandler from '../../functions/other/multiplayer/roomPage/counterHandler'
import {
  hostSocketHandler,
  playersUpdateSocketHandler,
  counterSocketHandler,
  questionHostSocketHandler,
  onDisplayResultSocketHandler,
  onResultsHandler
} from '../../functions/connection/multiplayer/sockets/roomPageSockets'

let socket: any

const MultiplayerRoom = ({ location }: any) => {
  const history = useHistory()
  const [globalState, setGlobalState] = useGameState()
  const [state, dispatch] = useReducer(multiplayerRoomReducer, initialState)
  const ENDPOINT = 'localhost:8080'

  const roomId = globalState.multiplayer.roomId
  const gameId = globalState.multiplayer.gameId

  useEffect(() => {
    const data = {
      gameId: gameId,
      roomId: roomId
    }
    if (data.gameId === '' && data.roomId === '')
      return history.push('/multiplayer/mode')

    socket = io(ENDPOINT)
    hostSocketHandler(socket, data, dispatch)
    setGlobalState({ type: GlobalHandlers.HEADER_HANDLER, value: 'host' })

    return () => {
      socket.disconnect()
      socket.off()
    }
  }, [history, location.search, roomId, gameId, setGlobalState])

  useEffect(() => {
    if (gameId === '' && roomId === '') return () => {}

    playersUpdateSocketHandler(socket, dispatch)
    counterSocketHandler(socket, dispatch)
    questionHostSocketHandler(socket, dispatch)
    onDisplayResultSocketHandler(socket, dispatch)
    onResultsHandler(socket, dispatch)
    socket.on(SocketNames.FATAL_ERROR, () => history.push('/'))
  }, [gameId, roomId, history])

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
    const roomId = globalState.multiplayer.roomId.substring(1)
    const urlLink = `http://localhost:3000/join?roomid=${roomId}&gameid=${gameId}`
    navigator.clipboard.writeText(urlLink)
    dispatch({
      type: Handlers.ALERT_HANDLER,
      value: {
        type: 'info',
        title: 'Success',
        message: 'Copied to clipboard.',
        status: true
      }
    })
  }

  return (
    <PageLayout>
      <RoomStatusDislpay
        roomState={state.roomState}
        roomName={globalState.multiplayer.roomId}
        headerDisplay={state.headerDisplay}
        players={state.players}
        playerAlertHandler={() =>
          dispatch({ type: Handlers.CLEAR_PLAYER_ALERT_HANDLER })
        }
        counter={state.counter.currentValue}
        resultsOnDisplay={state.finaleResults.resultsOnDisplay}
        resultsState={state.finaleResults.resultsState}
        results={state.finaleResults.results}
      />
      <BtnDisplay
        shareLinkBtnDisabled={state.startGameReq}
        shareLinkGameBtnHandler={shareHandler}
        startGameBtnDisabled={
          state.startGameReq || state.players.array.length <= 0
        }
        startGameBtnHandler={startGameHandler}
      />
      <Alert
        shouldDisplay={state.alert.status}
        alertTimer={1000}
        type={state.alert.type}
        title={state.alert.title}
        message={state.alert.message}
        alertHandler={cleanSnackBarAlertHandler}
      />
    </PageLayout>
  )
}

export default MultiplayerRoom
