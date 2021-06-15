import { useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'

import { LocalStorage } from '../../constants/interface/global/localStorage'
import { SinglePlayerLocalStorage } from '../../constants/interface/global/game'

import { useGlobalState } from '../../providers/StateProvider'
import { GlobalHandler } from '../../constants/interface/provider/globalHandler'

import { singleGameRecoveryReq } from '../../functions/other/singlePlayer/singleGameRecoveryHandler'

import { recoveryReducer } from '../../functions/tools/singlePlayer/recoveryPageReducer'
import { Handlers } from '../../constants/interface/singleRecovery/recoveryHandler'
import { initialState } from '../../constants/initialState/singlePlayerRecovery'

import PageLayout from '../../components/layout/PageLayout'
import Btn from '../../components/custom/button/Btn'
import RecoveryDisplay from '../../components/custom/global/GameInfoDisplay'

const RecoveryPage = () => {
  const history = useHistory()
  const [globalState, setGlobalState] = useGlobalState()
  const [state, dispatch] = useReducer(recoveryReducer, initialState)

  useEffect(() => {
    const localStorage: SinglePlayerLocalStorage = JSON.parse(
      window.localStorage.getItem(LocalStorage.SINGLE_GAME)!
    )
    setGlobalState({
      type: GlobalHandler.USER_HANDLER,
      value: {
        id: undefined,
        nickname: localStorage.user,
        status: 'player'
      }
    })
    setGlobalState({
      type: GlobalHandler.GAME_HANDLER,
      value: {
        mode: 'single player',
        dummyId: localStorage.gameSettings.artificialGameId,
        gameId: localStorage.gameSettings.gameId,
        roomId: undefined,
        quantity: undefined,
        timer: localStorage.gameSettings.timer,
        level: undefined
      }
    })
    dispatch({ type: Handlers.RECOVERED_DATA_HANDLER, value: true })
  }, [setGlobalState])

  useEffect(() => {
    if (globalState.game.gameId === '') return () => {}
    singleGameRecoveryReq(globalState.game.gameId, dispatch, setGlobalState)
  }, [globalState.game.gameId, setGlobalState])

  const startNewGameHandler = () => {
    window.localStorage.removeItem('game')
    history.push('/')
  }

  return (
    <PageLayout>
      <RecoveryDisplay
        message={state.message}
        displayInfo={[
          {
            header: 'Game ID: ',
            message: globalState.game.dummyId ? globalState.game.dummyId : ''
          },
          { header: 'Established by: ', message: globalState.user.nickname }
        ]}
        fetchedData={state.recoveredData}
      />
      <Btn
        type={'main'}
        disabled={!state.proceedGame}
        name={'Continue Game'}
        margin={'normal'}
        clickHandler={() => history.push('/waitingroom')}
      />
      <Btn
        type={'aux'}
        name={'Start New Game'}
        margin={'small'}
        clickHandler={startNewGameHandler}
      />
    </PageLayout>
  )
}

export default RecoveryPage
