import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useGameState } from '../providers/GameStateProvider'
import { makeStyles } from '@material-ui/core/styles'

import MainButton from '../components/MainButton'

const WaitingRoomPage = () => {
  const classes = useStyles()
  const history = useHistory()
  const setGameState = useGameState()[1]
  const [counter, setCounter] = useState<number>(3)

  useEffect(() => {
    setGameState(cur => ({...cur, header: 'GET READY!'}))
  }, [setGameState])

  useEffect(() => {
    let leftTime: number
    leftTime = counter
    const interval = setInterval(() => {
      leftTime = leftTime - 1
      if (leftTime  > -1) {
        setCounter(cur => cur - 1)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [counter])

  return (
    <div className={classes.root}>
      <h2 className={classes.text}>Your game starts in:</h2>
      <h1 className={classes.counter}>{counter}</h1>
      <MainButton
        colorType={'secondary'}
        notActive={false}
        mainBtnName={'LEAVE GAME'}
        onBtnClick={() => history.push('/')}
      />
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
    padding: 30
  },
  text: {
    color: theme.palette.success.main
  },
  counter: {
    color: theme.palette.text.secondary,
    fontSize: '8rem',
    marginBlock: 30,
    backgroundColor: 'rgba(0, 88, 4,0.45)',
    borderStyle: 'solid',
    border: '4px',
    borderColor: 'rgba(0, 88, 4,1)',
    lineHeight: '180px',
    height: 200,
    width: 200,
    borderRadius: 100
  }
}))

export default WaitingRoomPage
