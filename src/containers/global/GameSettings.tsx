import { useReducer } from 'react'
import { useGameState } from '../../providers/GlobalStateProvider'
import { Flex } from '@chakra-ui/react'

import CustomInput from '../../components/custom/global/CustomInput'
import Btn from '../../components/custom/button/Btn'
import SettingsDisplay from '../../components/custom/global/SettingsDisplay'

import {
  initialState,
  settingsReducer,
  Handlers
} from '../../functions/tools/global/settingsReducer'

interface GameSettingsProps {
  creatingNewGameHandler: (data: {
    nickname: string
    quantity: number
    time: number
    level: number
  }) => void
}

const GameSettings = (props: GameSettingsProps) => {
  const game = useGameState()[0]
  const [state, dispatch] = useReducer(settingsReducer, initialState)
  const settingsArray = Object.values(state.gameSettings)

  const dispatchHandler = (
    handlerType:
      | Handlers.QUANTITY_HANDLER
      | Handlers.TIME_HANDLER
      | Handlers.LEVEL_HANDLER,
    setKey: number
  ) => {
    dispatch({ type: handlerType, value: Number(setKey) })
  }

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      w="100%"
      maxW={300}
      paddingBlock={1}
    >
      <CustomInput
        isDisabled={game.mode === 'multiplayer' ? true : false}
        placeholder={'Enter your nickname...'}
        value={state.nicknameInput}
        maxLength={12}
        onChange={(event) =>
          dispatch({ type: Handlers.NICKNAME_HANDLER, value: event })
        }
      />
      {settingsArray.map((el, index) => {
        return (
          <SettingsDisplay
            key={index}
            stateValue={el.currentState}
            settingsHandler={(event) => dispatchHandler(el.reducerType, event)}
            description={el.description}
            options={el.variants}
          />
        )
      })}
      <Btn
        disabled={
          game.mode === 'multiplayer' ||
          (game.mode === 'single player' && state.nicknameInput)
            ? false
            : true
        }
        name={'Create New Game'}
        type={'main'}
        margin={'normal'}
        clickHandler={props.creatingNewGameHandler.bind(this, {
          nickname: state.nicknameInput,
          quantity:
            state.gameSettings.quantity.variants[
              state.gameSettings.quantity.currentState
            ].value,
          level:
            state.gameSettings.level.variants[
              state.gameSettings.level.currentState
            ].value,
          time: state.gameSettings.time.variants[
            state.gameSettings.time.currentState
          ].value
        })}
      />
    </Flex>
  )
}

export default GameSettings
