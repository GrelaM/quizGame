import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      padding: '10px 25px',
      // color: theme.palette.text.secondary,
      color: 'white',
      fontWeight: 'bold',
      letterSpacing: 2,
      width: 120
    }
  }
}))

interface mainButtonProps {
  onBtnClick: () => void,
  title: string,
  notActive: boolean
}

const GameButton = (props: mainButtonProps) => {
  const classes = useStyles(props)

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={props.onBtnClick} disabled={props.notActive}>
        {props.title}
      </Button>
    </div>
  )
}

export default GameButton
