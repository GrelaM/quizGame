import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useGameState } from '../providers/GlobalStateProvider'
import { Handlers as GlobalHandlers } from '../functions/tools/global/contextReducer'

import PageLayout from '../components/layout/PageLayout'
import Picture from '../components/custom/global/Picture'
import Btn from '../components/custom/button/Btn'

const StartPage = () => {
  const history = useHistory()
  const setGlobalState = useGameState()[1]

  useEffect(() => {
    setGlobalState({ type: GlobalHandlers.HEADER_HANDLER, value: 'Quiz Game' })
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
        margin={'small'}
        clickHandler={gameModeHandler.bind(this, 1)}
      />
      <Btn
        name={'multiplayer'}
        type={'aux'}
        margin={'normal'}
        clickHandler={gameModeHandler.bind(this, 2)}
      />
    </PageLayout>
  )
}

export default StartPage
