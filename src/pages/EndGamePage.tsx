import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import Picture from '../assets/img/smile.jpg'
import { useGameState } from '../providers/GameStateProvider'
import GamePicture from '../components/GamePicture'
import MainButton from '../components/MainButton'
import LoadingSpinner from '../components/LoadingSpinner'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    padding: 5,
    maxHeight: 450,
    margin: 'auto'
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexGrow: 1
  },
  textArea: {
    color: theme.palette.text.primary
  }
}))

const EndGamePage = () => {
  const classes = useStyles()
  const history = useHistory()
  const [gameState, setGameState] = useGameState()
  const [results, setResults] = useState<number>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setResults(Math.floor(Math.random() * 10))
      setGameState((currentState) => ({ ...currentState, header: 'THE END' }))
      setIsLoading(false)
    }, 3000)
  }, [setGameState])

  return (
    <div className={classes.root}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={classes.center}>
          <GamePicture picture={Picture} />
          <div className={classes.textArea}>
            <h2>
              WELL DONE{' '}
              <span style={{ color: '#268f00' }}>{gameState.nickname}</span>!!!
            </h2>
            <h3>
              Your result is: <span style={{ color: '#268f00' }}>{results}/10</span>
            </h3>
          </div>
          <MainButton
            notActive={false}
            mainBtnName={'New Game'}
            onBtnClick={() => history.push('/')}
          />
        </div>
      )}
    </div>
  )
}

export default EndGamePage
