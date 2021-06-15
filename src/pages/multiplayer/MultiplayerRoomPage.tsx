import { useReducer, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalState } from '../../providers/StateProvider'
import { GlobalHandler } from '../../constants/interface/provider/globalHandler'
import { initialState } from '../../constants/initialState/multiplayerRoom'
import { multiplayerRoomReducer } from '../../functions/tools/multiplayer/multiplayerRoomReducer'
import { Handlers } from '../../constants/interface/multiplayerRoom/roomHandler'
import SocketNames from '../../constants/socketNames'
import io from 'socket.io-client'

import PageLayout from '../../components/layout/PageLayout'
import BtnDisplay from '../../components/layout/multiplayer/RoomBtnDisplay'
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
  const [globalState, setGlobalState] = useGlobalState()
  const [state, dispatch] = useReducer(multiplayerRoomReducer, initialState)
  const ENDPOINT = 'localhost:8080'

  const roomId =
    globalState.game.roomId !== undefined ? globalState.game.roomId : ''
  const gameId =
    globalState.game.gameId !== undefined ? globalState.game.gameId : ''

  useEffect(() => {
    const data = {
      gameId: gameId,
      roomId: roomId
    }
    if (data.gameId === '' && data.roomId === '')
      return history.push('/multiplayer/mode')

    socket = io(ENDPOINT)
    hostSocketHandler(socket, data, dispatch, setGlobalState)
    setGlobalState({
      type: GlobalHandler.MENU_HANDLER,
      value: { header: 'host', activeState: true }
    })

    return () => {
      socket.disconnect()
      socket.off()
    }
  }, [history, location.search, roomId, gameId, setGlobalState])

  useEffect(() => {
    playersUpdateSocketHandler(socket, dispatch, setGlobalState)
    counterSocketHandler(socket, dispatch)
    questionHostSocketHandler(socket, dispatch)
    onDisplayResultSocketHandler(socket, dispatch)
    onResultsHandler(socket, dispatch)
    socket.on(SocketNames.FATAL_ERROR, () => history.push('/'))
  }, [gameId, roomId, history, setGlobalState])

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

  const shareHandler = () => {
    const roomId = globalState.game.roomId
      ? globalState.game.roomId.substring(1)
      : ''
    const urlLink = `http://localhost:3000/join?roomid=${roomId}&gameid=${gameId}`
    navigator.clipboard.writeText(urlLink)
    setGlobalState({
      type: GlobalHandler.MENU_ALERT_HANDLER,
      value: {
        type: 'info',
        title: 'Success',
        message: 'Copied to clipboard.',
        status: true,
        displayTimer: 2000
      }
    })
  }

  return (
    <PageLayout>
      <RoomStatusDislpay
        roomState={state.roomState}
        roomName={roomId}
        headerDisplay={state.headerDisplay}
        players={state.players}
        noPlayersMessage={
          state.finaleResults.resultsState
            ? 'Players left room...'
            : 'Please invite players...'
        }
        counter={state.counter.currentValue}
        resultsOnDisplay={state.finaleResults.resultsOnDisplay}
        resultsState={state.finaleResults.resultsState}
        results={state.finaleResults.results}
      />
      <BtnDisplay
        onResults={state.finaleResults.resultsOnDisplay}
        shareLinkBtnDisabled={state.startGameReq}
        shareLinkGameBtnHandler={shareHandler}
        startGameBtnDisabled={state.startGameReq || state.players.length <= 0}
        startGameBtnHandler={startGameHandler}
        startNewGameHandler={() => history.push('/')}
      />
    </PageLayout>
  )
}

export default MultiplayerRoom
