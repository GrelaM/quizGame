import {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import Picture from '../assets/img/questionSmall.png'
import InputComponent from '../components/InputComponent'
import GamePicture from '../components/GamePicture'
import MainButton from '../components/MainButton'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    padding: 30
  }
}))

const StartPage = () => {
  const classes = useStyles()

  const [nickname, setNickname] = useState('')
  const history = useHistory()

  const nicknameHandler = (enteredNickname: string) => {
    setNickname(enteredNickname)
  }

  return (
    <div className={classes.root}>
      <GamePicture picture={Picture}/>
      <InputComponent onInputChange={nicknameHandler}/>
      <MainButton
        notActive={!nickname ? true : false}
        mainBtnName={'Start Game'}
        onBtnClick={() => history.push('/game')}
      />
    </div>
  )
}

export default StartPage
