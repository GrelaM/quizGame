import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useGameState } from '../providers/GameStateProvider'
import axios from 'axios'

import Picture from '../assets/img/smile.jpg'
import GamePicture from '../components/GamePicture'
import MainButton from '../components/MainButton'
import LoadingSpinner from '../components/LoadingSpinner'

type ResultsType = {
  points: number
  maxPoints: number
}

const fetchResultsHandler = async (gameId: string) => {
  const id = gameId.substring(1)
  const fetchedData = await axios.get(
    `http://localhost:8080/results/singlegame/%23${id}`
  )
  return fetchedData
}

const EndGamePage = () => {
  const classes = useStyles()
  const history = useHistory()
  const gameState = useGameState()[0]
  const [results, setResults] = useState<ResultsType>({
    points: 0,
    maxPoints: 0
  })
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [useGlobalState, setUseGlobalState] = useGameState()

  const gameId = useGlobalState.gameId

  useEffect(() => {
    fetchResultsHandler(gameId)
      .then((res) => {
        const resultState: ResultsType = {
          points: res.data.points,
          maxPoints: res.data.maxPoints
        }
        setResults(resultState)
        setIsLoading(false)
      })
      .catch((err) => console.log(err))
  }, [gameId])

  const newGameHandler = () => {
    setUseGlobalState({
      header: 'Quiz Game',
      nickname: 'Anonymous',
      gameId: '',
      timer: 0,
      questionNum: 0
    })
    history.push('/')
  }

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
              Your result is:{' '}
              <span style={{ color: '#268f00' }}>
                {results.points}/{results.maxPoints}
              </span>
            </h3>
          </div>
          <MainButton
            notActive={false}
            mainBtnName={'New Game'}
            onBtnClick={newGameHandler}
          />
        </div>
      )}
    </div>
  )
}

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

export default EndGamePage
