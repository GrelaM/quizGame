import { useState, useEffect } from 'react'
import { useGameState } from '../providers/GameStateProvider'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import QuestionCard from '../components/QuestionCard'
import GameButton from '../components/GameButton'
import randomQuestions from '../constants/randomQuestions'
import LoadingSpinner from '../components/LoadingSpinner'

// TYPE OF STATE
type State = {
  time: number
  category: string
  questionNumber: number
  question: string
  hints: string[]
  answers: {
    code: number
    value: string
  }[]
  currentGameStatus: boolean
  nextQuestion: boolean
}

//INITIAL STATES
const initialState: State = {
  time: 0,
  category: '',
  questionNumber: 0,
  question: '',
  hints: [],
  answers: [],
  currentGameStatus: false,
  nextQuestion: false
}

const fetchData = () =>
  new Promise<State>((resolve) => {
    setTimeout(() => {
      const rN = Math.floor(Math.random() * 4)

      const primaryAnswersData = Object.values(randomQuestions[rN].answers)
      function shuffle(array: any) {
        array.sort(() => Math.random() - 0.5)
      }
      let shuffleAnswers = primaryAnswersData
      shuffle(shuffleAnswers)

      const serverData: State = {
        time: 15,
        category: randomQuestions[rN].category,
        questionNumber: 1,
        question: randomQuestions[rN].question,
        hints: randomQuestions[rN].hints,
        answers: shuffleAnswers,
        currentGameStatus: true,
        nextQuestion: randomQuestions[rN].nextQuestion
      }
      resolve(serverData)
    }, 1000)
  })

const GamePage = () => {
  const classes = useStyles()
  const history = useHistory()
  const setHeader = useGameState()[1]
  const [state, setState] = useState(initialState)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [counter, setCounter] = useState(state.time)
  const [hints, setHints] = useState<string[]>([''])
  const [btnState, setBtnState] = useState<boolean>(false)

  // SERVER CONNECTION
  useEffect(() => {
    fetchData()
      .then((res) => {
        setState(res)
      })
      .then(() => {
        setIsLoading(false)
        setHeader((current) => ({
          ...current,
          header: `Question #${Math.floor(Math.random() * 10)}`
        }))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [setHeader])

  // RESPONSE HANDLER
  function responseHandler(code: number | null) {
    setBtnState(true)
    console.log(code)
  }

  // TIMER AND HINTS
  useEffect(() => {
    // TIME COUNTING
    function timeCounting() {
      setCounter(state.time)
      let leftTime: number
      leftTime = state.time
      const interval = setInterval(() => {
        setCounter((counter) => counter - 1)
        leftTime = leftTime - 1
        if (leftTime === 0) {
          clearInterval(interval)
        }
      }, 1000)
    }

    // HINTS
    function hintsController() {
      const nextHintTimer = (state.time / 3) * 1000
      let number = 0

      setHints([state.hints[0]])
      const interval = setInterval(() => {
        if (number === 0) {
          number += 1
          setHints((hints) => hints.concat(state.hints[1]))
        } else if (number === 1) {
          number += 1
          setHints((hints) => hints.concat(state.hints[2]))
        } else if (number === 2) {
          clearInterval(interval)
          setIsLoading(true)

          if (state.nextQuestion) {
            setTimeout(() => {
              fetchData()
                .then((res) => {
                  setState(res)
                })
                .then(() => {
                  setIsLoading(false)
                  setBtnState(false)
                  setHeader((current) => ({
                    ...current,
                    header: `Question #${Math.floor(Math.random() * 10)}`
                  }))
                })
                .catch((err) => {
                  console.log(err)
                })
            }, 1500)
          } else {
            console.log('THE END!')
            history.push('/result')
          }
        }
      }, nextHintTimer)
    }

    setCounter(state.time)
    if (state.currentGameStatus) {
      timeCounting()
      hintsController()
    }
  }, [
    state.currentGameStatus,
    state.time,
    state.hints,
    state.questionNumber,
    state.nextQuestion,
    setHeader,
    history
  ])

  return (
    <div className={classes.root}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={classes.center}>
          <div className={classes.clock}>{counter}</div>
          <QuestionCard hints={hints} />
          <div className={classes.btnArea}>
            <GameButton
              title={state.answers[0].value}
              notActive={btnState}
              onBtnClick={() => responseHandler(state.answers[0].code)}
            />
            <GameButton
              title={state.answers[1].value}
              notActive={btnState}
              onBtnClick={() => responseHandler(state.answers[1].code)}
            />
            <GameButton
              title={state.answers[2].value}
              notActive={btnState}
              onBtnClick={() => responseHandler(state.answers[2].code)}
            />
            <GameButton
              title={state.answers[3].value}
              notActive={btnState}
              onBtnClick={() => responseHandler(state.answers[3].code)}
            />
          </div>
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
    flexGrow: 1,
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
