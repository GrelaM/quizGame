import { useState, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useGameState } from '../providers/GameStateProvider'

import { startPageReducerFunction } from '../functions/tools/startPageReducer'
import { singleGameReq } from '../functions/connection/singleGameReq'

import LoadingSpinner from '../components/LoadingSpinner'
import GameMode from '../components/GameMode'
import SinglePlayerMode from '../components/SinglePlayerMode'

export interface InitialStateType {
  gameMode: number
  nickname: string
  timer: string
  level: string
  quantity: string
}

export enum Handlers {
  GAMEMODE_HANDLER = 'GAMEMODE_HANDLER',
  NICKNAME_HANDLER = 'NICKNAME_HANDLER',
  TIMER_HANDLER = 'TIMER_HANDLER',
  LEVEL_HANDLER = 'LEVEL_HANDLER',
  QUANTITY_HANDLER = 'QUANTITY_HANDLER'
}

const initialState: InitialStateType = {
  gameMode: 0,
  nickname: '',
  timer: '9',
  level: 'EASY',
  quantity: '5'
}

const StartPage = () => {
  const classes = useStyles()
  const history = useHistory()
  const setGlobalNickname = useGameState()[1]
  const [state, dispatch] = useReducer(startPageReducerFunction, initialState)
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

        setGlobalNickname((current) => ({
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
    }
  }

  let mode
  if (state.gameMode === 0) {
    mode = (
      <GameMode
        gameModeHandler={(mode) =>
          dispatch({ type: Handlers.GAMEMODE_HANDLER, value: mode })
        }
      />
    )
  } else if (state.gameMode === 1) {
    mode = (
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
        gameModeHandler={(mode) =>
          dispatch({ type: Handlers.GAMEMODE_HANDLER, value: mode })
        }
      />
    )
  }

  return (
    <div className={classes.root}>
      {mode}
      {isLoading ? <LoadingSpinner /> : null}
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

export default StartPage
