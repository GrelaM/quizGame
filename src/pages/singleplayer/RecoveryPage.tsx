import { useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useGameState } from '../../providers/GameStateProvider'

import LoadingSpinner from '../../components/general/LoadingSpinner'
import MainButton from '../../components/general/MainButton'
import RecoveryDisplay from '../../components/general/RecoveryDisplay'
import { recoveryPageReducerFunction } from '../../functions/tools/recoveryPageReducer'
import { singleGameRecoveryReq } from '../../functions/other/singleGameRecovery'

export interface RecoveryStateType {
  user: string
  artificialGameId: string
  gameId: string
  proceedGame: boolean
  isLoading: boolean
  recoveredData: boolean
  message: string
}

interface LocalStorageType {
  user: string
  gameSettings: {
    artificialGameId: string
    gameId: string
    message: string
    timer: number
  }
}

export enum Handlers {
  PROCEED_GAME_HANDLER = 'PROCEED_GAME_HANDLER',
  LOADING_HANDLER = 'LOADING_HANDLER',
  RECOVERED_DATA_HANDLER = 'RECOVERED_DATA_HANDLER'
}

export const initialState: RecoveryStateType = {
  user: '',
  artificialGameId: '',
  gameId: '',
  proceedGame: false,
  isLoading: true,
  recoveredData: false,
  message: 'Please wait...'
}

const RecoveryPage = () => {
  const classes = useStyles()
  const history = useHistory()
  const setGameState = useGameState()[1]
  const [state, dispatch] = useReducer(
    recoveryPageReducerFunction,
    initialState
  )

  useEffect(() => {
    const localStorage: LocalStorageType = JSON.parse(
      window.localStorage.getItem('game')!
    )
    setGameState((cur) => ({ ...cur, nickname: localStorage.user, gameId: localStorage.gameSettings.gameId }))
    dispatch({ type: Handlers.RECOVERED_DATA_HANDLER, value: localStorage })
  }, [setGameState])

  useEffect(() => {
    if (state.gameId === '') return () => {}
    ;(async () => {
      const fetchedData = await singleGameRecoveryReq(state.gameId, dispatch)
      try {
        setGameState((cur) => ({
          ...cur,
          questionNum: fetchedData.nextQuestion
        }))
      } catch (e) {
        console.log(e)
      }
    })()
  }, [state.gameId, setGameState])

  const startNewGameHandler = () => {
    window.localStorage.removeItem('game')
    history.push('/')
  }

  return (
    <div className={classes.root}>
      <RecoveryDisplay
        message={state.message}
        artificialGameId={state.artificialGameId}
        user={state.user}
        recoveredData={state.recoveredData}
      />
      <div className={classes.btnBox}>
        <MainButton
          notActive={!state.proceedGame}
          mainBtnName={'Continue Game'}
          onBtnClick={() => history.push('/waitingroom')}
        />
        <MainButton
          colorType={'secondary'}
          notActive={false}
          mainBtnName={'Start New Game'}
          onBtnClick={startNewGameHandler}
        />
      </div>
      {state.isLoading ? <LoadingSpinner /> : null}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 10
  },
  btnBox: {
    marginBlock: 5,
    paddingBlock: 5
  }
}))

export default RecoveryPage
