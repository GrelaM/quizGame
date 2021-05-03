import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { useGameState } from '../providers/GameStateProvider'

import LoadingSpinner from '../components/LoadingSpinner'
import QuestionCard from '../components/QuestionCard'
import GameButton from '../components/GameButton'

// TYPE OF STATE
type State = {
  category: string
  questionNumber: number
  question: string
  hints: string[]
  answers: {
    code: number
    value: string
  }[]
  gameStatus: boolean
}

type Answer = { code: number; value: string }

//INITIAL STATES
const initialState: State = {
  category: '',
  questionNumber: 0,
  question: 'Loading...',
  hints: ['The place of a well and, later, of a city in southern Judah.', 'Today, it retains its position as a crossroads town and an important marketplace.', 'It was from it that Abraham went to Moriah to offer Isaac as a sacrifice, and he returned there to dwell.'],
  answers: [
    { code: -1, value: 'A' },
    { code: -1, value: 'B' },
    { code: -1, value: 'C' },
    { code: -1, value: 'D' }
  ],
  gameStatus: true
}

const fetchDataHandler = async (gameId: string) => {
  const id = gameId
  const fetchedData = await axios.get(
    `http://localhost:8080/singleplayer/game/${id}`
  )
  return fetchedData
}

const sendAnswerHandler = async (
  gameId: string,
  question: number,
  data: {
    code: number
    value: string
  }
) => {
  const id = gameId
  const fetchedData = await axios.post(
    `http://localhost:8080/singleplayer/game/${id}/question/${question}`,
    data
  )
  return fetchedData
}

const GamePage = () => {
  const classes = useStyles()
  const [useGlobalState, setUseGlobalState] = useGameState()
  const history = useHistory()

  const [state, setState] = useState(initialState)
  const [counter, setCounter] = useState(0)
  const [hints, setHints] = useState<string[]>(state.hints)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [updatedState, setUpdatedState] = useState<number>(0)
  const [response, setResponse] = useState<number>(0)
  const [activeBtn, setActiveBtn] = useState<boolean>(false)

  const time = useGlobalState.timer
  const gameId = useGlobalState.gameId

  // //DATA EFFECT
  useEffect(() => {
    // console.log(state.gameStatus)

    setIsLoading(true)
    if (state.gameStatus === false) {
      return () => {
        console.log('THE END...')
        setUseGlobalState(cur => ({
          ...cur,
          header: 'WELL DONE !!!'
        }))
        history.push('/result')
      }
    } else {
      fetchDataHandler(gameId)
        .then((res) => {         
          const newRes = res.data.question
          // console.log(res.data.question)          
          // console.log(typeof res.data.question.questionNumber)
          // console.log('Next Question Req...')

          setUseGlobalState((cur) => ({
            ...cur,
            header: `Question #${res.data.question.questionNumber}`,
            questionNum: res.data.question.questionNumber
          }))
          setState(newRes)
          setUpdatedState((cur) => cur + 1)
          setCounter(time)
          setActiveBtn(false)
          setIsLoading(false)
        })
        .catch((err) => console.log(err))
    }
  }, [response, gameId, time, setUseGlobalState, state.gameStatus, history])

  // USER DISPLAY EFFECT
  useEffect(() => {
    if (!state.hints.length) return () => {}
    //TIMER
    let leftTime: number
    leftTime = time
    const timeInterval = setInterval(() => {
      leftTime = leftTime - 1
      setCounter((counter) => counter - 1)
      if (leftTime === 0) {
        clearInterval(timeInterval)
        setIsLoading(true)
        sendAnswerHandler(gameId, useGlobalState.questionNum!, {
          code: -1,
          value: ''
        })
          .then((res) => {
            if (res.data.status) {
              setResponse((cur) => cur + 1)
              if (state.gameStatus) {
                setState(initialState)
              } else {
                setState((cur) => ({
                  ...cur,
                  question: 'Loading...',
                  hints: []
                }))
              }
            }
          })
          .catch((err) => console.log(err))
      } else {
      }
    }, 1000)

    // HINTS
    const nextHintTimer = (time / 3) * 1000
    let number = 0
    
    setHints([state.hints[0]])
    const hintsInterval = setInterval(() => {
      if (number === 0) {
        number += 1
        setHints((hints) => hints.concat(state.hints[1]))
      } else if (number === 1) {
        number += 1
        setHints((hints) => hints.concat(state.hints[2]))
      } else if (number === 2) {
        clearInterval(hintsInterval)
        setState(initialState)
        setHints([])
      }
    }, nextHintTimer)

    return () => {
      clearInterval(timeInterval)
      clearInterval(hintsInterval)
    }
  }, [updatedState, gameId, time, useGlobalState.questionNum, state.hints, state.gameStatus])

  // BTN METHOD
  const responseHandler = (answer: Answer) => {
    // console.log('I was clicked...')

    const questionNumber = state.questionNumber - 1
    setIsLoading(true)
    setActiveBtn(true)

    sendAnswerHandler(gameId, questionNumber, answer)
      .then((res) => {
        if (res.data.status) {
          setResponse((cur) => cur + 1)
          if (state.gameStatus) {
            setState(initialState)
          } else {
            setState((cur) => ({
              ...cur,
              question: 'Loading...',
              hints: [],
              gameStatus: false
            }))
          }
          setHints([])
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className={classes.root}>
      <div className={classes.clock}>{counter}</div>
      <QuestionCard question={state.question} hints={hints} />
      <div className={classes.btnArea}>
        <GameButton
          title={state.answers[0].value}
          notActive={activeBtn}
          onBtnClick={() => responseHandler(state.answers[0])}
        />
        <GameButton
          title={state.answers[1].value}
          notActive={activeBtn}
          onBtnClick={() => responseHandler(state.answers[1])}
        />
        <GameButton
          title={state.answers[2].value}
          notActive={activeBtn}
          onBtnClick={() => responseHandler(state.answers[2])}
        />
        <GameButton
          title={state.answers[3].value}
          notActive={activeBtn}
          onBtnClick={() => responseHandler(state.answers[3])}
        />
      </div>
      {isLoading ? <LoadingSpinner /> : null}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexGrow: 1,
    padding: 5,
    margin: 'auto'
  },
  textArea: {
    color: theme.palette.text.primary
  },
  btnArea: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  clock: {
    color: 'white',
    fontSize: '1.8rem',
    marginTop: 5,
    height: 40,
    width: 300,
    backgroundColor: theme.palette.primary.dark,
    textAlign: 'center',
    borderRadius: 5
  }
}))

export default GamePage
