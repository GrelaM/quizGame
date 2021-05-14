import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

import GamePicture from '../../components/general/GamePicture'
import Picture from '../../assets/img/questionSmall.png'

interface RecoveryDisplayProps {
  message: string
  artificialGameId: string
  user: string
  recoveredData: boolean
}

const RecoveryDisplay = (props: RecoveryDisplayProps) => {
  const classes = useStyles()

  return (
    <div className={classes.box}>
      <GamePicture picture={Picture} size={'small'} />
      <div className={classes.textBox}>
        <h2 className={classes.margin}>{props.message}</h2>
        <p className={classes.margin}>
          Game ID:
          <span className={classes.textProps}> {props.artificialGameId}</span>
        </p>
        <p className={classes.margin}>
          Established by:
          <span className={classes.textProps}> {props.user}</span>
        </p>
      </div>
      {props.recoveredData ? (
        <div className={classes.progress}>
          <LinearProgress color="secondary" variant={'indeterminate'} />
        </div>
      ) : null}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  box: {
    minWidth: '95%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: 'rgba(255,255,255,0.45)',
    color: theme.palette.text.primary,
    '@media only screen and (min-width: 922px)': {
      minWidth: '60%'
    }
  },
  btnBox: {
    marginBlock: 5,
    paddingBlock: 5
  },
  textBox: {
    width: '100%',
    paddingBottom: 15,
    '@media only screen and (min-width: 500px)': {
      width: '80%'
    }
  },
  margin: {
    margin: 4
  },
  textProps: {
    color: theme.palette.success.main,
    fontWeight: 'bold'
  },
  progress: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}))

export default RecoveryDisplay
