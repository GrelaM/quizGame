import { useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { LocalStorage } from '../../constants/localStorage'
import { useGameState } from '../../providers/GlobalStateProvider'
import { Handlers as GlobalHandlers } from '../../functions/tools/global/contextReducer'

import {
  Handlers,
  hostPageReducer,
  initialState
} from '../../functions/tools/multiplayer/hostPageReducer'

import {
  newGameHandler,
  openRoomHandler,
  agreeHandler,
  disagreeHandler,
  errorHandler
} from '../../functions/other/multiplayer/hostPage/handlers'

import PageLayout from '../../components/layout/PageLayout'
import AlertDialog from '../../components/events/AlertDialog'
import Settings from '../../containers/global/GameSettings'
import RoomInfoDisplay from '../../components/custom/multiplayer/RoomInfoDisplay'

const HostPage = () => {
  const history = useHistory()
  const setGlobalState = useGameState()[1]
  const [state, dispatch] = useReducer(hostPageReducer, initialState)

  useEffect(() => {
    const data = window.localStorage.getItem(LocalStorage.MULTIPLAYER)
    if (data) {
      dispatch({ type: Handlers.RECOVERY_HANDLER, value: true })
    }
  }, [])

  useEffect(() => {
    setGlobalState({
      type: GlobalHandlers.ON_GAME_SETTINGS_HANDLER,
      value: {
        header: 'new quiz',
        mode: 'multiplayer'
      }
    })
  }, [setGlobalState])

  let dislpay = (
    <Settings
      creatingNewGameHandler={(settings) =>
        newGameHandler(settings, dispatch, setGlobalState)
      }
    />
  )
  if (state.mode === 1) {
    dislpay = (
      <RoomInfoDisplay
        message={state.display.message}
        displayInfo={[
          { header: state.display.header, message: state.display.roomId }
        ]}
        fetchedData={!state.shouldGo}
        gameState={state.shouldGo}
        goBackHandler={() => history.goBack()}
        openRoomHandler={() =>
          openRoomHandler(state.display.roomId, (id: string) =>
            history.push(`/hosting/room/${id}`)
          )
        }
      />
    )
  }

  return (
    <PageLayout>
      {dislpay}
      <AlertDialog
        onClose={() => {}}
        isOpen={state.localStorageAlert}
        agree={agreeHandler.bind(this, dispatch, setGlobalState)}
        disagree={disagreeHandler.bind(this, dispatch)}
      />
    </PageLayout>
  )
}

export default HostPage
