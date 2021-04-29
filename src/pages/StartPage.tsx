import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { useGameState } from '../providers/GameStateProvider'

import Picture from '../assets/img/questionSmall.png'
import InputComponent from '../components/InputComponent'
import GamePicture from '../components/GamePicture'
import MainButton from '../components/MainButton'
import LoadingSpinner from '../components/LoadingSpinner'

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
  const setGlobalNickname = useGameState()[1]
  const [nickname, setNickname] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const history = useHistory()

  const nicknameHandler = (enteredNickname: string) => {
    setNickname(enteredNickname)
  }

  const startGameHandler = () => {
    setIsLoading(true)
    axios
      .get('http://localhost:8080/game/newgame')
      .then((res) => {
        console.log(`${res.data.message} ID: ${res.data.gameId}`)
        setGlobalNickname((current) => ({
          ...current,
          nickname: nickname,
          gameId: res.data.gameId,
          timer: res.data.timer // SECONDS!!!
        }))
      })
      .then(() => {
        history.push('/test') // FOR NOW IT IS WRONG REDIRECTION!!!
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className={classes.root}>
      <GamePicture picture={Picture} />
      <InputComponent onInputChange={nicknameHandler} />
      <MainButton
        notActive={!nickname ? true : false}
        mainBtnName={'Start Game'}
        onBtnClick={startGameHandler}
      />
      {isLoading ? <LoadingSpinner /> : null}
    </div>
  )
}

export default StartPage
