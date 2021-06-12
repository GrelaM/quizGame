import { useReducer } from 'react'
import { useGlobalState } from '../../providers/StateProvider'
import { Flex } from '@chakra-ui/react'

import CustomInput from '../../components/custom/global/CustomInput'
import Btn from '../../components/custom/button/Btn'
import SettingsDisplay from '../../components/custom/global/SettingsDisplay'

import { initialState } from '../../constants/initialState/settings'
import { SettingsHandler } from '../../constants/interface/settings/settingsHandler'
import { settingsReducer } from '../../functions/tools/global/settingsReducer'

interface GameSettingsProps {
  creatingNewGameHandler: (data: {
    nickname: string
    quantity: number
    time: number
    level: number
  }) => void
}

const GameSettings = (props: GameSettingsProps) => {
  const game = useGlobalState()[0]
  const [state, dispatch] = useReducer(settingsReducer, initialState)
  const settingsArray = Object.values(state.gameSettings)

  const dispatchHandler = (
    handlerType: 
      | SettingsHandler.QUANTITY_HANDLER
      | SettingsHandler.TIME_HANDLER
      | SettingsHandler.LEVEL_HANDLER,
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
        isDisabled={game.menu.header === 'multiplayer' ? true : false}
        placeholder={'Enter your nickname...'}
        value={state.nicknameInput}
        maxLength={12}
        onChange={(event) =>
          dispatch({ type: SettingsHandler.NICKNAME_HANDLER, value: event })
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
          game.menu.header === 'multiplayer' ||
          (game.menu.header === 'single player' && state.nicknameInput)
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
