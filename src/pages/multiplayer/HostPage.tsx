import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useGameState } from '../../providers/GameStateProvider'
import { makeStyles } from '@material-ui/core/styles'

import Settings from '../../containers/MultiplayerSettings/MultiplayerSettings'
import MainButton from '../../components/general/MainButton'
import HostingDisplay from '../../components/general/HostingDisplay'

const initialState = {
  message: 'Please wait...',
  roomId: 'soon will be created...',
  shouldGo: false
}

const HostPage = () => {
  const classes = useStyles()
  const history = useHistory()
  const setGlobalState = useGameState()[1]
  const [mode, setMode] = useState(1)
  const [state, setState] = useState(initialState)

  useEffect(() => {
    setGlobalState((current) => ({ ...current, header: 'new quiz' }))
  }, [setGlobalState])

  const newGameHandler = (data: any) => {
    setMode(1)
    console.log(data)
  }

  let dislpay = (
    <Settings creatingNewGameHandler={(settings) => newGameHandler(settings)} />
  )
  if (mode === 1) {
    dislpay = (
      <HostingDisplay
        message={state.message}
        roomId={state.roomId}
        gameStatus={!state.shouldGo}
      />
    )
  }

  return (
    <div className={classes.root}>
      {dislpay}
      <MainButton
        colorType={'secondary'}
        notActive={false}
        mainBtnName={'Back'}
        onBtnClick={() => history.goBack()}
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

export default HostPage
