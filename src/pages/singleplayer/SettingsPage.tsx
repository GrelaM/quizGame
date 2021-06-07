import { useReducer, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useGameState } from '../../providers/GlobalStateProvider'
import { Handlers as GlobalHandlers } from '../../functions/tools/global/contextReducer'
import { LocalStorage } from '../../constants/localStorage'

import {
  initialState,
  singlePlayerReducer,
  Handlers
} from '../../functions/tools/singlePlayer/singlePlayerReducer'
import {
  startGameHandler,
  clearAlertHandler,
  credentialsAgreeHandler,
  credentialsDisagreeHandler
} from '../../functions/other/singlePlayer/settingsHandlers'

import PageLayout from '../../components/layout/PageLayout'
import AlertDialog from '../../components/events/AlertDialog'
import LoadingSpinner from '../../components/layout/LoadingSpinner'

import GameSettings from '../../containers/global/GameSettings'

const SettingsPage = () => {
  const history = useHistory()
  const setGlobalState = useGameState()[1]
  const [state, dispatch] = useReducer(singlePlayerReducer, initialState)

  useEffect(() => {
    setGlobalState({
      type: GlobalHandlers.ON_GAME_SETTINGS_HANDLER,
      value: { header: 'single player', mode: 'single player' }
    })
    if (window.localStorage.getItem(LocalStorage.SINGLE_GAME)) {
      dispatch({ type: Handlers.CREDENTIALS_HANDLER, value: true })
    }

    return () => {}
  }, [setGlobalState])

  return (
    <PageLayout
      toggleAlert={state.toggleAlert}
      alertHandler={() => clearAlertHandler(dispatch, setGlobalState)}
      alertTimer={5000}
    >
      <GameSettings
        creatingNewGameHandler={(settings) => {
          startGameHandler(settings, dispatch, setGlobalState, () =>
            history.push('/waitingroom')
          )
        }}
      />
      <AlertDialog
        isOpen={state.credentials}
        agree={() =>
          credentialsAgreeHandler(
            () => history.push('/singlegame/recovery'),
            setGlobalState
          )
        }
        disagree={() =>
          credentialsDisagreeHandler(
            () => window.localStorage.removeItem('game'),
            dispatch
          )
        }
        onClose={() =>
          credentialsDisagreeHandler(
            () => window.localStorage.removeItem('game'),
            dispatch
          )
        }
      />
      <LoadingSpinner toggleSpinner={state.isLoading} />
    </PageLayout>
  )
}

export default SettingsPage
