import { useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { LocalStorage } from '../../constants/localStorage'
import { useGlobalState } from '../../providers/StateProvider'
import { GlobalHandler } from '../../constants/interface/provider/globalHandler'

import { initialState } from '../../constants/initialState/hostPage'
import { hostPageReducer } from '../../functions/tools/multiplayer/hostPageReducer'
import { Handlers } from '../../constants/interface/hostPage/hostHandler'

import {
  newGameHandler,
  openRoomHandler,
  agreeHandler,
  disagreeHandler
} from '../../functions/other/multiplayer/hostPage/handlers'

import PageLayout from '../../components/layout/PageLayout'
import AlertDialog from '../../components/events/AlertDialog'
import Settings from '../../containers/global/GameSettings'
import RoomInfoDisplay from '../../components/custom/multiplayer/RoomInfoDisplay'

const HostPage = () => {
  const history = useHistory()
  const setGlobalState = useGlobalState()[1]
  const [state, dispatch] = useReducer(hostPageReducer, initialState)

  useEffect(() => {
    const data = window.localStorage.getItem(LocalStorage.MULTIPLAYER)
    if (data) {
      dispatch({ type: Handlers.RECOVERY_HANDLER, value: true })
    }
  }, [])

  useEffect(() => {
    setGlobalState({
      type: GlobalHandler.MENU_HANDLER,
      value: {
        header: 'new quiz',
        activeState: true
      }
    })
  }, [setGlobalState])

  let dislpay: JSX.Element = (
    <Settings
      creatingNewGameHandler={(settings) =>
        newGameHandler(settings, dispatch, setGlobalState, () =>
          dispatch({ type: Handlers.SET_MODE_HANDLER, value: 0 })
        )
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
          openRoomHandler(state.display.roomId, (id: string) => {
            history.push(`/hosting/room/${id}`)
          })
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
