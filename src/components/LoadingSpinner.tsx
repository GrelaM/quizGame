import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.2)',
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%'
    }
  })
)

const LoadingSpinner = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  )
}

export default LoadingSpinner
