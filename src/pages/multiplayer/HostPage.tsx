import { useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { useGameState } from '../../providers/GameStateProvider'

import Settings from '../../containers/MultiplayerSettings/MultiplayerSettings'
import PageLayout from '../../components/chakra/components/layout/PageLayout'
import Header from '../../components/chakra/components/custom/Header'
import AlertDialog from '../../components/chakra/components/events/AlertDialog'
import OnOpenRoomDisplay from '../../components/chakra/components/layout/multiplayer/OnOpenRoomDisplay'
import Alert from '../../components/chakra/components/events/Alert'

import { multiplayerGameReq } from '../../functions/connection/multiplayer/multiplayeGameReq'
import { recoveryReq } from '../../functions/connection/multiplayer/multiplayerRecoveryReq'
import {
  Handlers,
  hostPageReducer,
  initialState
} from '../../functions/tools/multiplayer/hostPageReducer'

const HostPage = () => {
  const history = useHistory()
  const setGlobalState = useGameState()[1]
  const [state, dispatch] = useReducer(hostPageReducer, initialState)

  useEffect(() => {
    const data = window.localStorage.getItem('multiplayer')
    if (data) {
      dispatch({ type: Handlers.RECOVERY_HANDLER, value: true })
    }
  }, [])

  useEffect(() => {
    setGlobalState((current) => ({ ...current, header: 'new quiz' }))
  }, [setGlobalState])

  const newGameHandler = async (data: {
    quantity: number
    level: number
    time: number
  }) => {
    dispatch({ type: Handlers.SET_MODE_HANDLER, value: 1 })
    try {
      const fetchedData = await multiplayerGameReq(data)
      if (fetchedData) {
        setGlobalState((cur) => ({
          ...cur,
          mode: 'multiplayer',
          gameId: fetchedData.data.gameId,
          roomId: fetchedData.data.roomId
        }))
        dispatch({
          type: Handlers.FETCHED_DATA_HANDLER,
          value: {
            display: {
              message: fetchedData.data.message,
              header: 'Room: ',
              roomId: fetchedData.data.roomId
            },
            shouldGo: true
          }
        })
        const localStorage = {
          gameId: fetchedData.data.gameId,
          roomId: fetchedData.data.roomId
        }
        window.localStorage.setItem('multiplayer', JSON.stringify(localStorage))
      }
    } catch (e) {
      dispatch({
        type: Handlers.ALERT_HANDLER,
        value: {
          type: 'error',
          status: true,
          title: e.message,
          message: 'Please try again...'
        }
      })
    }
  }

  const openRoomHandler = (roomId: string) => {
    const id = roomId.substring(1)
    history.push(`/hosting/room/${id}`)
  }

  const agreeHandler = async () => {
    try {
      const data: { gameId: string; roomId: string } = JSON.parse(
        window.localStorage.getItem('multiplayer')!
      )
      const fetchedData = await recoveryReq(data.gameId)
      if (fetchedData) {
        setGlobalState((cur) => ({
          ...cur,
          mode: 'multiplayer',
          gameId: data.gameId,
          roomId: data.roomId
        }))
        dispatch({
          type: Handlers.RECOVERY_SUCCESS_HANDLER,
          value: {
            display: {
              message: 'Game was recoverd successfully!',
              header: 'Room',
              roomId: data.roomId
            },
            shouldGo: true,
            localStorageAlert: false,
            mode: 1
          }
        })
      }
    } catch (e) {
      dispatch({
        type: Handlers.ALERT_HANDLER,
        value: {
          type: 'error',
          status: true,
          title: e.message,
          message: 'Please try again...'
        }
      })
    }
  }

  const disagreeHandler = () => {
    window.localStorage.removeItem('multiplayer')
    dispatch({ type: Handlers.RECOVERY_HANDLER, value: false })
  }

  const alertHandler = () => {
    dispatch({
      type: Handlers.ALERT_HANDLER,
      value: { status: false, type: undefined, title: '', message: '' }
    })
    dispatch({ type: Handlers.SET_MODE_HANDLER, value: 0 })
  }

  let dislpay = (
    <Settings
      onBackClick={() => history.goBack()}
      creatingNewGameHandler={(settings) => newGameHandler(settings)}
    />
  )
  if (state.mode === 1) {
    dislpay = (
      <OnOpenRoomDisplay
        message={state.display.message}
        displayInfo={[
          { header: state.display.header, message: state.display.roomId }
        ]}
        fetchedData={!state.shouldGo}
        gameState={state.shouldGo}
        goBackHandler={() => history.goBack()}
        openRoomHandler={() => openRoomHandler(state.display.roomId)}
      />
    )
  }

  return (
    <PageLayout>
      <Header />
      {dislpay}
      <AlertDialog
        onClose={() => {}}
        isOpen={state.localStorageAlert}
        agree={agreeHandler}
        disagree={disagreeHandler}
      />
      {state.alert.status ? (
        <Alert
          alertHandler={alertHandler}
          type={state.alert.type}
          title={state.alert.title}
          message={state.alert.message}
        />
      ) : null}
    </PageLayout>
  )
}

export default HostPage
