import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { useGlobalState } from '../../providers/StateProvider'
import { GlobalHandler } from '../../constants/interface/provider/globalHandler'

import PageLayout from '../../components/layout/PageLayout'
import Picture from '../../components/custom/global/Picture'
import Btn from '../../components/custom/button/Btn'

const MultiplayerMode = () => {
  const history = useHistory()
  const setGlobalState = useGlobalState()[1]

  useEffect(() => {
    setGlobalState({
      type: GlobalHandler.MENU_HANDLER,
      value: {
        header: 'Multiplayer',
        activeState: true
      }
    })
    setGlobalState({ type: GlobalHandler.MODE_HANDLER, value: 'multiplayer' })
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
