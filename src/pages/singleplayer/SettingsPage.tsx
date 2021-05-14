import { useState, useReducer, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useGameState } from '../../providers/GameStateProvider'

import { singlePlayerReducer } from '../../functions/tools/singlePlayerReducer'
import { singleGameReq } from '../../functions/connection/singleGameReq'

import LoadingSpinner from '../../components/general/LoadingSpinner'
import SinglePlayerMode from '../../components/gameMode/SinglePlayerMode'
import AlertDialog from '../../components/events/AlertDialog'
import Snackbar from '../../components/events/Snackbar'

export interface InitialStateType {
  nickname: string
  timer: string
  level: string
  quantity: string
  credentials: boolean
  error: {
    status: boolean
    message: string
  }
}

export enum Handlers {
  NICKNAME_HANDLER = 'NICKNAME_HANDLER',
  TIMER_HANDLER = 'TIMER_HANDLER',
  LEVEL_HANDLER = 'LEVEL_HANDLER',
  QUANTITY_HANDLER = 'QUANTITY_HANDLER',
  CREDENTIALS_HANDLER = 'CREDENTIALS_HANDLER',
  SET_ERROR_HANDLER = 'ERROR_HANDLER',
  CLEAR_ERROR_HANDLER = 'ERROR_HANDLER'
}

export const initialState: InitialStateType = {
  nickname: '',
  timer: '9',
  level: 'EASY',
  quantity: '5',
  credentials: false,
  error: {
    status: false,
    message: ''
  }
}

const SinglePlayerSettings = () => {
  const classes = useStyles()
  const history = useHistory()
  const setGlobalState = useGameState()[1]
  const [state, dispatch] = useReducer(singlePlayerReducer, initialState)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setGlobalState((cur) => ({ ...cur, header: 'single player' }))
    if (window.localStorage.getItem('game')) {
      dispatch({ type: Handlers.CREDENTIALS_HANDLER, value: true })
    }
  }, [setGlobalState])

  const credentialsDisagreeHandler = () => {
    window.localStorage.removeItem('game')
    dispatch({ type: Handlers.CREDENTIALS_HANDLER, value: false })
  }

  const credentialsAgreeHandler = () => {
    setGlobalState((cur) => ({ ...cur, header: 'Recovery Mode' }))
    history.push('/singlegame/recovery')
  }

  const startGameHandler = async () => {
    setIsLoading(true)
    try {
      const gameRequest = await singleGameReq(
        Number(state.quantity),
        Number(state.timer),
        state.level
      )

      if (gameRequest !== undefined) {
        const fetchedData: {
          data: {
            gameId: string
            artificialGameId: string
            timer: number
          }
        } = gameRequest

        const localStorageData = {
          gameSettings: fetchedData.data,
          user: state.nickname
        }
        window.localStorage.setItem('game', JSON.stringify(localStorageData))

        setGlobalState((current) => ({
          ...current,
          nickname: state.nickname,
          gameId: fetchedData.data.gameId,
          artificialGameId: fetchedData.data.artificialGameId,
          timer: fetchedData.data.timer // SECONDS!!!
        }))
      }
      history.push('/waitingroom')
      setIsLoading(false)
    } catch (e) {
      console.log(e)
      dispatch({
        type: Handlers.SET_ERROR_HANDLER,
        value: { status: true, message: 'Ups... We could\'t create this game. Please try again...' }
      })
      setIsLoading(false)
    }
  }

  const clearErrorHandler = () => {
    dispatch({
      type: Handlers.CLEAR_ERROR_HANDLER,
      value: { status: false, message: '' }
    })
  }

  return (
    <div className={classes.root}>
      <SinglePlayerMode
        nickname={state.nickname ? true : false}
        timerValue={state.timer}
        levelValue={state.level}
        questionQuantity={state.quantity}
        startGameHandler={startGameHandler}
        nicknameHandler={(value) =>
          dispatch({ type: Handlers.NICKNAME_HANDLER, value: value })
        }
        timeHandler={(event) =>
          dispatch({ type: Handlers.TIMER_HANDLER, value: event })
        }
        levelHandler={(event) =>
          dispatch({ type: Handlers.LEVEL_HANDLER, value: event })
        }
        quantityHandler={(event) =>
          dispatch({ type: Handlers.QUANTITY_HANDLER, value: event })
        }
        gameModeHandler={() => {
          history.push('/')
          setGlobalState((current) => ({ ...current, header: 'Quiz Game' }))
        }}
      />
      {isLoading ? <LoadingSpinner /> : null}
      {state.credentials ? (
        <AlertDialog
          shouldBeDisplayed={state.credentials}
          agreeHandler={credentialsAgreeHandler}
          disagreeHandler={credentialsDisagreeHandler}
        />
      ) : null}
      <Snackbar
        type={'error'}
        state={state.error.status}
        message={state.error.message}
        closeHandler={clearErrorHandler}
      />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    padding: 10
  }
}))

export default SinglePlayerSettings
