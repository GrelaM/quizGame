import { useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { LocalStorage } from '../../constants/localStorage'
import { useGameState } from '../../providers/GlobalStateProvider'
import { Handlers as GlobalHandlers } from '../../functions/tools/global/contextReducer'
import { singleGameRecoveryReq } from '../../functions/other/singlePlayer/singleGameRecoveryHandler'

import {
  recoveryReducer,
  initialState,
  Handlers,
  LocalStorageType
} from '../../functions/tools/singlePlayer/recoveryPageReducer'

import LoadingSpinner from '../../components/layout/LoadingSpinner'
import PageLayout from '../../components/layout/PageLayout'
import Btn from '../../components/custom/button/Btn'
import RecoveryDisplay from '../../components/custom/global/GameInfoDisplay'

const RecoveryPage = () => {
  const history = useHistory()
  const setGameState = useGameState()[1]
  const [state, dispatch] = useReducer(recoveryReducer, initialState)

  useEffect(() => {
    const localStorage: LocalStorageType = JSON.parse(
      window.localStorage.getItem(LocalStorage.SINGLE_GAME)!
    )
    setGameState({
      type: GlobalHandlers.SET_RECOVERY_MODE_SINGLE_GAME_HANDLER,
      value: {
        nickname: localStorage.user,
        status: 'player',
        artificialGameId: localStorage.gameSettings.artificialGameId,
        gameId: localStorage.gameSettings.gameId,
        timer: localStorage.gameSettings.timer
      }
    })
    dispatch({ type: Handlers.RECOVERED_DATA_HANDLER, value: localStorage })
  }, [setGameState])

  useEffect(() => {
    if (state.gameId === '') return () => {}
    singleGameRecoveryReq(state.gameId, dispatch, setGameState)
  }, [state.gameId, setGameState])

  const startNewGameHandler = () => {
    window.localStorage.removeItem('game')
    history.push('/')
  }

  const errorHandler = () => {
    dispatch({ type: Handlers.TOGGLE_ALERT, value: false })
    setGameState({ type: GlobalHandlers.CLEAR_ALERT_HANDLER })
    history.push('/')
  }

  return (
    <PageLayout
      alertHandler={errorHandler}
      toggleAlert={state.toggleAlert}
      alertTimer={3000}
    >
      <RecoveryDisplay
        message={state.message}
        displayInfo={[
          { header: 'Game ID: ', message: state.artificialGameId },
          { header: 'Established by: ', message: state.user }
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
      <LoadingSpinner toggleSpinner={state.isLoading}/>
    </PageLayout>
  )
}

export default RecoveryPage
