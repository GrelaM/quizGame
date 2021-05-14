import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

import GamePicture from '../../components/general/GamePicture'
import Picture from '../../assets/img/questionSmall.png'
import MainButton from '../../components/general/MainButton'

interface HostingDisplayProps {
    message: string
    roomId: string
    gameStatus: boolean
}

const HostingDisplay = (props: HostingDisplayProps) => {
  const classes = useStyles()

  return (
    <div className={classes.box}>
      <GamePicture picture={Picture} size={'small'} />
      <div className={classes.textBox}>
        <h2 className={classes.margin}>
          {props.message}
        </h2>
        <p className={classes.margin}>
          Room:
          <span className={classes.textProps}>{' '}{props.roomId}</span>
        </p>
      </div>
      {props.gameStatus ? (
        <div className={classes.progress}>
          <LinearProgress color="secondary" variant={'indeterminate'} />
        </div>
      ) : null}
      <MainButton
          notActive={props.gameStatus}
          mainBtnName={'Open Room'}
          onBtnClick={() => console.log('Open Room')}
        />
        <MainButton
          notActive={props.gameStatus}
          mainBtnName={'Share Link'}
          onBtnClick={() => console.log('Share Link')}
        />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  box: {
    width: 300,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    color: theme.palette.text.primary,
    '@media only screen and (min-width: 400px)': {
      width: 360
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
    paddingBottom: 15,
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}))

export default HostingDisplay
