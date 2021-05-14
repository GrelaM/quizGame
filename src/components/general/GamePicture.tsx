import { makeStyles } from '@material-ui/core/styles'
import { mainLinearGradient } from '../../constants/main-theme-provider'

const useStyles = makeStyles(() => ({
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 250,
    borderRadius: 125,
    overflow: 'hidden',
    background: mainLinearGradient
  },
  smallImageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    background: mainLinearGradient
  },
  image: {
    width: '95%',
    height: '95%',
    borderRadius: 'inherit'
  }
}))

const GamePicture = (props: {picture: string, size?: string}) => {
  const classes = useStyles()

  return (
    <div className={props.size === 'small' ? classes.smallImageContainer : classes.imageContainer}>
      <img src={props.picture} className={classes.image} alt="" />
    </div>
  )
}

export default GamePicture
