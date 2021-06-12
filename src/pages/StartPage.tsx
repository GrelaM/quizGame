import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useGlobalState } from '../providers/StateProvider'
import { GlobalHandler } from '../constants/interface/provider/globalHandler'

import PageLayout from '../components/layout/PageLayout'
import Picture from '../components/custom/global/Picture'
import Btn from '../components/custom/button/Btn'

const StartPage = () => {
  const history = useHistory()
  const setGlobalState = useGlobalState()[1]

  useEffect(() => {
    setGlobalState({
      type: GlobalHandler.MENU_HANDLER,
      value: { header: 'quiz game', activeState: false }
    })
    setGlobalState({
      type: GlobalHandler.SETTINGS_HANDLER,
      value: {
        toggleLoading: false,
        credentials: false
      }
    })
  }, [setGlobalState])

  const gameModeHandler = (mode: 1 | 2) => {
    if (mode === 1) {
      history.push('/singlegame/settings')
    } else if (mode === 2) {
      history.push('/multiplayer/mode')
    }
  }

  return (
    <PageLayout>
      <Picture type="main" size="normal" />
      <Btn
        name={'single player'}
        type={'main'}
        margin={'normal'}
        clickHandler={gameModeHandler.bind(this, 1)}
      />
      <Btn
        name={'multiplayer'}
        type={'aux'}
        margin={'small'}
        clickHandler={gameModeHandler.bind(this, 2)}
      />
    </PageLayout>
  )
}

export default StartPage
