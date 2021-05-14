import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

const Alert = (props: any) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

interface CustomizedSnackbarsProps {
  type: string
  state: boolean
  message: string
  closeHandler: () => void
}

export const CustomizedSnackbars = (props: CustomizedSnackbarsProps) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Snackbar
        open={props.state}
        autoHideDuration={6000}
        onClose={props.closeHandler}
      >
        <Alert onClose={props.closeHandler} severity={props.type}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}))

export default CustomizedSnackbars
