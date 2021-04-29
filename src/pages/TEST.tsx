import { useEffect, useState } from 'react'
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
  hints: [],
  answers: [
    { code: -1, value: 'A' },
    { code: -1, value: 'B' },
    { code: -1, value: 'C' },
    { code: -1, value: 'D' }
  ],
  gameStatus: true
}

const fetchDataHandler = async (gameId: string) => {
  const id = gameId.substring(1)
  const fetchedData = await axios.get(
    `http://localhost:8080/singleplayer/game/%23${id}`
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
  const id = gameId.substring(1)
  const fetchedData = await axios.post(
    `http://localhost:8080/singleplayer/game/%23${id}/question/${question}`,
    data
  )
  return fetchedData
}

const Test = () => {
  const classes = useStyles()
  const [useGlobalState, setUseGlobalState] = useGameState()
  const [state, setState] = useState(initialState)

  const [counter, setCounter] = useState(0)
  const [hints, setHints] = useState<string[]>([''])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [updatedState, setUpdatedState] = useState<number>(0)
  const [response, setResponse] = useState<number>(0)
  const [activeBtn, setActiveBtn] = useState<boolean>(false)

  const time = useGlobalState.timer
  const gameId = useGlobalState.gameId

  //DATA EFFECT
  useEffect(() => {
    setIsLoading(true)
    fetchDataHandler(gameId)
      .then((res) => {
        console.log(res.data.question)
        setUseGlobalState((cur) => ({
          ...cur,
          header: `Question #${res.data.question.questionNumber}`,
          questionNum: res.data.question.questionNumber
        }))
        setState(res.data.question)
        setUpdatedState((cur) => cur + 1)
        setCounter(time)
        setActiveBtn(false)
        setIsLoading(false)
      })
      
      .catch((err) => console.log(err))
  }, [response, gameId, time, setUseGlobalState])

  // USER DISPLAY EFFECT
  useEffect(() => {
    if(!state.hints.length) return () => {}
    //TIMER
    let leftTime: number
    leftTime = time
    const timeInterval = setInterval(() => {
      leftTime = leftTime - 1
      setCounter((counter) => counter - 1)
      if (leftTime === 0 && state.gameStatus === true) {
        clearInterval(timeInterval)
        setIsLoading(true)
        sendAnswerHandler(gameId, useGlobalState.questionNum!, {code: -1, value: ''})
          .then((res) => {
            if (res.data.status) {
              setResponse((cur) => cur + 1)
              setState(initialState)
              setHints([])
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
    const questionNumber = state.questionNumber
    console.log('I was clicked...')
    setIsLoading(true)
    setActiveBtn(true)

    sendAnswerHandler(gameId, questionNumber, answer)
      .then((res) => {
        if (res.data.status) {
          setResponse((cur) => cur + 1)
          setState(initialState)
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
    flex: 1,
    padding: 5,
    maxHeight: 450,
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

export default Test
