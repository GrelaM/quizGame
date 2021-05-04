import { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
})

const LinearBuffer = () => {
  const classes = useStyles()
  const [progress, setProgress] = useState(0)
  const [state, setState] = useState(true)

  const clickHandler = () => {
    setState(true)
    setProgress((cur) => (cur = 0))
  }

  const progressRef = useRef(() => {})
  useEffect(() => {
    if (state === false) {
      return () => {
        console.log('Here...')
      }
    } else {
      progressRef.current = () => {
        if (progress > 100) {
          setState(cur => (cur = false))
          console.log('Times out...')
        } else {
          const diff = (100/13) / 20
          setProgress(progress + diff)
        }
      }
    }
  }, [progress, state])

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current()
    }, 50)

    if (progress > 100) {
      clearInterval(timer)
    }

    return () => {
      clearInterval(timer)
    }
  }, [progress])

  return (
    <div>
      <div className={classes.root}>
        <LinearProgress variant="determinate" value={progress} />
      </div>
      <button onClick={clickHandler}>Click me</button>
    </div>
  )
}

export default LinearBuffer