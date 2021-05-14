import { makeStyles } from '@material-ui/core/styles'

import MainButton from '../general/MainButton'
import ModeComponent from '../gameMode/ModeComponent'
import GamePicture from '../general/GamePicture'
import Picture from '../../assets/img/questionSmall.png'

interface GameModeProps {
  gameModeHandler: (mode: number) => void
}

enum GameModeSettings {
  SINGLEPLAYER = 1,
  MULTIPLAYER = 2
}

const GameMode = (props: GameModeProps) => {
  const classes = useStyles()

  return (
    <ModeComponent>
      <GamePicture picture={Picture} />
      <div className={classes.btnRoot}>
        <MainButton
          notActive={false}
          mainBtnName={'Single Player'}
          onBtnClick={props.gameModeHandler.bind(
            this,
            GameModeSettings.SINGLEPLAYER
          )}
        />
        <MainButton
          notActive={false}
          mainBtnName={'Multiplayer'}
          onBtnClick={props.gameModeHandler.bind(
            this,
            GameModeSettings.MULTIPLAYER
          )}
        />
      </div>
    </ModeComponent>
  )
}

const useStyles = makeStyles(() => ({
  btnRoot: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
    margin: 'auto',
    height: 140 
  }
}))

export default GameMode
