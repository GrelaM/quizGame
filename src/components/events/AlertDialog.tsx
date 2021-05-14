import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'

interface AlertDialogProps {
  shouldBeDisplayed: boolean
  agreeHandler: () => void
  disagreeHandler: () => void
}

const AlertDialog = (props: AlertDialogProps) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <DialogTitle id="alert-dialog-title" className={classes.titleContent}>
          Recovery of last game
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className={classes.content}
          >
            We detected some credentials connected with your last game. Do you
            want to recover and continue your last game?
          </DialogContentText>
          <DialogContentText
            id="alert-dialog-description"
            className={classes.content}
          >
            <span style={{ color: 'red' }}>Warning: </span>lack of consent will
            cause deletion of your last game data.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.disagreeHandler} color="secondary">
            Disagree
          </Button>
          <Button onClick={props.agreeHandler} color="primary">
            Agree
          </Button>
        </DialogActions>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.65)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    minHeight: 200,
    width: '90%',
    backgroundColor: 'rgba(255,255,255, 1)',
    textAlign: 'left',
    '@media only screen and (min-width: 992px)': {
      width: '65%'
    }
  },
  titleContent: {
    color: theme.palette.success.main,
    fontWeight: 'bold'
  },
  content: {
    color: theme.palette.text.primary
  }
}))

export default AlertDialog
