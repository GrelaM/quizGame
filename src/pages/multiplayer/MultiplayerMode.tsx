import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { useGameState } from '../../providers/GlobalStateProvider'
import { Handlers as GlobalHandlers } from '../../functions/tools/global/contextReducer'

import PageLayout from '../../components/layout/PageLayout'
import Picture from '../../components/custom/global/Picture'
import Btn from '../../components/custom/button/Btn'

const MultiplayerMode = () => {
  const history = useHistory()
  const setGlobalState = useGameState()[1]

  useEffect(() => {
    setGlobalState({
      type: GlobalHandlers.ON_GAME_SETTINGS_HANDLER,
      value: {
        header: 'Multiplayer',
        mode: 'multiplayer'
      }
    })
  }, [setGlobalState])

  return (
    <PageLayout>
      <Picture size="normal" type="main" />
      <Btn
        margin="normal"
        type="main"
        name={'Host Game'}
        clickHandler={() => history.push('/hosting')}
      />
      <Btn
        margin="small"
        type="aux"
        name={'Join'}
        clickHandler={() => history.push('/join')}
      />
    </PageLayout>
  )
}

export default MultiplayerMode
