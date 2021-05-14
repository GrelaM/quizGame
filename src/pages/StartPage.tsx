import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useGameState } from '../providers/GameStateProvider'

import GameMode from '../components/gameMode/GameMode'

const StartPage = () => {
  const classes = useStyles()
  const history = useHistory()
  const setGlobalState = useGameState()[1]

  useEffect(() => {
    setGlobalState((cur) => ({ ...cur, header: 'Quiz Game' }))
  }, [setGlobalState])

  const gameModeHandler = (mode: number) => {
    if (mode === 1) {
      history.push('/singlegame/settings')
    } else if (mode === 2) {
      history.push('/multiplayer/mode')
    }
  }

  return (
    <div className={classes.root}>
      <GameMode gameModeHandler={gameModeHandler} />
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
