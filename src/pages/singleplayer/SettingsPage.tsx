import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { LocalStorage } from '../../constants/localStorage'

import { useGlobalState } from '../../providers/StateProvider'
import { GlobalHandler } from '../../constants/interface/provider/globalHandler'

import {
  startGameHandler,
  credentialsAgreeHandler,
  credentialsDisagreeHandler
} from '../../functions/other/singlePlayer/settingsHandlers'

import PageLayout from '../../components/layout/PageLayout'
import AlertDialog from '../../components/events/AlertDialog'

import GameSettings from '../../containers/global/GameSettings'

const SettingsPage = () => {
  const history = useHistory()
  const [globalState, setGlobalState] = useGlobalState()

  useEffect(() => {
    setGlobalState({
      type: GlobalHandler.MENU_HANDLER,
      value: { header: 'single player', activeState: true }
    })
    setGlobalState({ type: GlobalHandler.MODE_HANDLER, value: 'single player' })
    if (window.localStorage.getItem(LocalStorage.SINGLE_GAME)) {
      setGlobalState({
        type: GlobalHandler.SETTINGS_HANDLER,
        value: { credentials: true, toggleLoading: false }
      })
    }

    return () => {}
  }, [setGlobalState])

  return (
    <PageLayout>
      <GameSettings
        creatingNewGameHandler={(settings) => {
          startGameHandler(settings, setGlobalState, () =>
            history.push('/waitingroom')
          )
        }}
      />
      <AlertDialog
        isOpen={globalState.settings.credentials}
        agree={() =>
          credentialsAgreeHandler(
            () => history.push('/singlegame/recovery'),
            setGlobalState
          )
        }
        disagree={() =>
          credentialsDisagreeHandler(
            () => window.localStorage.removeItem('game'),
            setGlobalState
          )
        }
        onClose={() =>
          credentialsDisagreeHandler(
            () => window.localStorage.removeItem('game'),
            setGlobalState
          )
        }
      />
    </PageLayout>
  )
}

export default SettingsPage
