import MainButton from '../components/MainButton'
import ModeComponent from '../components/ModeComponent'
import GamePicture from '../components/GamePicture'
import Picture from '../assets/img/questionSmall.png'

interface GameModeProps {
    gameModeHandler: (mode: number) => void
}

enum GameModeSettings {
    SINGLEPLAYER = 1,
    MULTIPLAYER = 2
}

const GameMode = (props: GameModeProps) => {
  return (
    <ModeComponent>
      <GamePicture picture={Picture} />
      <MainButton
        notActive={false}
        mainBtnName={'Single Player'}
        onBtnClick={props.gameModeHandler.bind(this, GameModeSettings.SINGLEPLAYER)}
      />
      <MainButton
        notActive={false}
        mainBtnName={'Multiplayer'}
        onBtnClick={props.gameModeHandler.bind(this, GameModeSettings.MULTIPLAYER)}
      />
    </ModeComponent>
  )
}

export default GameMode
