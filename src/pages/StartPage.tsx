import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { useGameState } from '../providers/GameStateProvider'

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

type RequestBody = {
  quantity: number
  time: number
  level: number
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

  const [gameMode, setGameMode] = useState<number>(0)

  const [nickname, setNickname] = useState('')
  const [timer, setTimer] = useState('9')
  const [level, setLevel] = useState('EASY')
  const [quantity, setQuantity] = useState('5')

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handler = (action: { type: string; value: string | number }) => {
    switch (action.type) {
      case Handlers.GAMEMODE_HANDLER:
        return setGameMode(Number(action.value))
      case Handlers.NICKNAME_HANDLER:
        return setNickname(action.value.toString())
      case Handlers.TIMER_HANDLER:
        return setTimer(action.value.toString())
      case Handlers.QUANTITY_HANDLER:
        return setQuantity(action.value.toString())
      case Handlers.LEVEL_HANDLER:
        return setLevel(action.value.toString())
    }
  }

  const startGameHandler = () => {
    setIsLoading(true)

    const levelHandler = (level: string) => {
      switch(level) {
        case 'EASE':
          return 1
        case 'MEDIUM':
          return 2
        case 'HARD':
          return 3
      }
    }

    const data: RequestBody = {
      quantity: Number(quantity),
      time: Number(timer),
      level: levelHandler(level) || 1
    }

    axios
      .post('http://localhost:8080/game/newgame', data)
      .then((res) => {
        console.log(`${res.data.message} ID: ${res.data.artificialGameId}`)
        setGlobalNickname((current) => ({
          ...current,
          nickname: nickname,
          gameId: res.data.gameId,
          artificialGameId: res.data.artificialGameId,
          timer: res.data.timer // SECONDS!!!
        }))
      })
      .then(() => {
        history.push('/waitingroom')
      })
      .catch((err) => console.log(err))
  }

  let mode = (
    <GameMode
      gameModeHandler={(mode) =>
        handler({ type: Handlers.GAMEMODE_HANDLER, value: mode })
      }
    />
  )
  if (gameMode === 1) {
    //SINGLE PLAYER MODE
    mode = (
      <SinglePlayerMode
        nicknameHandler={(value) =>
          handler({ type: Handlers.NICKNAME_HANDLER, value: value })
        }
        nickname={nickname ? true : false}
        startGameHandler={startGameHandler}
        timerValue={timer}
        levelValue={level}
        questionQuantity={quantity}
        timeHandler={(event) =>
          handler({ type: Handlers.TIMER_HANDLER, value: event })
        }
        levelHandler={(event) =>
          handler({ type: Handlers.LEVEL_HANDLER, value: event })
        }
        quantityHandler={(event) =>
          handler({ type: Handlers.QUANTITY_HANDLER, value: event })
        }
        gameModeHandler={(mode) =>
          handler({ type: Handlers.GAMEMODE_HANDLER, value: mode })
        }
      />
    )
  } else if (gameMode === 2) {
    //MULTIPAYER MODE
  }

  return (
    <div className={classes.root}>
      {mode}
      {isLoading ? <LoadingSpinner /> : null}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
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
