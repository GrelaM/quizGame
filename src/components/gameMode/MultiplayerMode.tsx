import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

import MainButton from '../general/MainButton'
import GamePicture from '../general/GamePicture'
import Picture from '../../assets/img/questionSmall.png'


const MultiplayerMode = () => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <div className={classes.root}>
      <GamePicture picture={Picture} />
      <MainButton
        notActive={false}
        mainBtnName={'Host Game'}
        onBtnClick={() => history.push('/hosting')}
      />
      <MainButton
        notActive={false}
        mainBtnName={'Join'}
        onBtnClick={() => history.push('/join')}
      />
      <MainButton
        colorType={'secondary'}
        notActive={false}
        mainBtnName={'Back'}
        onBtnClick={() => history.goBack()}
      />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexGrow: 1,
    paddingBlock: 5
  }
}))

export default MultiplayerMode
