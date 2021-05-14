import { makeStyles } from '@material-ui/core/styles'
import { useEffect } from 'react'
import { useGameState } from '../../providers/GameStateProvider'

import MulptiplayerMode from '../../components/gameMode/MultiplayerMode'

const Mode = () => {
  const classes = useStyles()
  const setGlobalState = useGameState()[1]

  useEffect(() => {
    setGlobalState((current) => ({ ...current, header: 'Multiplayer' }))
  }, [setGlobalState])

  return (
    <div className={classes.root}>
      <MulptiplayerMode />
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

export default Mode
