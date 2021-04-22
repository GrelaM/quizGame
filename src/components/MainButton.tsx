import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      padding: '10px 40px',
      color: theme.palette.text.secondary,
      fontWeight: 'bold',
      letterSpacing: 3
    }
  }
}))

interface mainButtonProps {
  onBtnClick: () => void,
  mainBtnName: string,
  notActive: boolean
}

const MainButton = (props: mainButtonProps) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={props.onBtnClick} disabled={props.notActive}>
        {props.mainBtnName}
      </Button>
    </div>
  )
}

export default MainButton
