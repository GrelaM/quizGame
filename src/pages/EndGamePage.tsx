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
  correctAnswers: number
  questionQuantity: number
}

const fetchResultsHandler = async (gameId: string) => {
  const id = gameId
  const fetchedData = await axios.get(
    `http://localhost:8080/results/singlegame/${id}`
  )
  return fetchedData
}

const EndGamePage = () => {
  const classes = useStyles()
  const history = useHistory()
  const gameState = useGameState()[0]
  const [results, setResults] = useState<ResultsType>({
    points: 0,
    correctAnswers: 0,
    questionQuantity: 0
  })
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [useGlobalState, setUseGlobalState] = useGameState()

  const gameId = useGlobalState.gameId

  useEffect(() => {
    fetchResultsHandler(gameId)
      .then((res) => {
        const resultState: ResultsType = {
          points: res.data.points,
          correctAnswers: res.data.givenCorrectAnswers,
          questionQuantity: res.data.questions
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
      artificialGameId: '#',
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
            <h2 style={{margin: '10px'}}>
              Congratulations{' '}
              <span style={{ color: '#268f00' }}>{gameState.nickname}</span>!!!
            </h2>
            <h3 style={{margin: '8px'}}>
              Your result is:{' '}
              <span style={{ color: '#268f00' }}>{results.points} points!</span>
            </h3>
            <h4 style={{margin: '8px'}}>
              You gave:{' '}
              <span style={{ color: '#268f00' }}>
                {results.correctAnswers}/{results.questionQuantity} correct
                answers.
              </span>
            </h4>
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
