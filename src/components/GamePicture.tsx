import { makeStyles } from '@material-ui/core/styles'
import { mainLinearGradient } from '../constants/main-theme-provider'

const useStyles = makeStyles((theme) => ({
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
  image: {
    width: '95%',
    height: '95%',
    borderRadius: 'inherit'
  }
}))

const GamePicture = (props: {picture: string}) => {
  const classes = useStyles()

  return (
    <div className={classes.imageContainer}>
      <img src={props.picture} className={classes.image} alt="" />
    </div>
  )
}

export default GamePicture
