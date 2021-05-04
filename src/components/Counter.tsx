import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

interface LinearBufferProps {
    progressValue: number
}

const LinearBuffer = (props: LinearBufferProps) => {
  const classes = useStyles()

  return (
    <div>
      <div className={classes.root}>
        <LinearProgress variant="determinate" value={props.progressValue} />
      </div>
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
})

export default LinearBuffer
