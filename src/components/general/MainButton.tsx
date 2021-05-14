import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      minWidth: '260px',
      margin: theme.spacing(1),
      padding: '12px 40px',
      color: theme.palette.text.secondary,
      fontWeight: 'bold',
      letterSpacing: 3
    }
  }
}))

interface mainButtonProps {
  onBtnClick: () => void
  mainBtnName: string
  notActive: boolean
  colorType?: string
}

const MainButton = (props: mainButtonProps) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color={props.colorType === undefined ? 'primary' : 'secondary'}
        onClick={props.onBtnClick}
        disabled={props.notActive}
      >
        {props.mainBtnName}
      </Button>
    </div>
  )
}

export default MainButton
