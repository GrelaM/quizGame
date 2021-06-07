import { Flex } from '@chakra-ui/react'
import { useReducer } from 'react'
import { initialState, Handlers, SettingsObject } from './SettingsState'
import { multiplayerSettingsReducer } from '../../functions/tools/multiplayer/multiplayerSettingsReducer'

import Settings from '../../components/chakra/components/custom/Settings'
import MainButton from '../../components/chakra/components/custom/MainButton'

interface MultiplayerSettingsProps {
  onBackClick: () => void
  creatingNewGameHandler: (data: {
    quantity: number
    time: number
    level: number
  }) => void
}

const MultiplayerSettings = (props: MultiplayerSettingsProps) => {
  const [state, dispatch] = useReducer(multiplayerSettingsReducer, initialState)
  const settingsArray = Object.values(state)

  const dispatchHandler = (handlerType: Handlers, setKey: number) => {
    dispatch({ type: handlerType, value: setKey })
  }

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      w="100%"
      maxW={300}
      paddingBlock={4}
    >
      {settingsArray.map((el: SettingsObject, index: number) => {
        return (
          <Settings
            key={index}
            description={el.description}
            options={el.variants}
            stateValue={el.currentState}
            label={el.label}
            settingsHandler={(event) => dispatchHandler(el.reducerType, event)}
          />
        )
      })}
      <Flex w="100%" direction="column" justifyContent="center" alignItems="center" maxH={80}>
        <MainButton
          name={'Create New Game'}
          type={'main'}
          clickHandler={props.creatingNewGameHandler.bind(this, {
            quantity:
              state.quantity.variants[state.quantity.currentState].value,
            level: state.level.variants[state.level.currentState].value,
            time: state.time.variants[state.time.currentState].value
          })}
        />
        <MainButton 
          margin={'small'}
          type={'aux'}
          name={'Back'}
          clickHandler={props.onBackClick}
        />
      </Flex>
    </Flex>
  )
}

export default MultiplayerSettings
