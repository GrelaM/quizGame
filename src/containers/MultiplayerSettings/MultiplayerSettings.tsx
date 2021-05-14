import { useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { initialState, Handlers, SettingsObject } from './SettingsState'
import { multiplayerSettingsReducer } from '../../functions/tools/multiplayerSettingsReducer'

import MainButton from '../../components/general/MainButton'
import GameSettings from '../../components/general/GameSettings'

interface MultiplayerSettingsProps {
  creatingNewGameHandler: (data: {
    quantity: number
    time: number
    level: number
  }) => void
}

const MultiplayerSettings = (props: MultiplayerSettingsProps) => {
  const classes = useStyles()
  const [state, dispatch] = useReducer(multiplayerSettingsReducer, initialState)
  const settingsArray = Object.values(state)

  const dispatchHandler = (handlerType: Handlers, setKey: number) => {
    dispatch({ type: handlerType, value: setKey })
  }

  return (
    <div className={classes.root}>
      {settingsArray.map((el: SettingsObject, index: number) => {
        return (
          <GameSettings
            key={index}
            description={el.description}
            label={el.label}
            stateValue={el.currentState}
            options={el.variants}
            settingsHandler={(event) => dispatchHandler(el.reducerType, event)}
            custom={{ type: el.label, state: true }}
          />
        )
      })}
      <MainButton
        notActive={false}
        mainBtnName={'Create New Game'}
        onBtnClick={props.creatingNewGameHandler.bind(this, {
          quantity: state.quantity.variants[state.quantity.currentState].value,
          level: state.level.variants[state.level.currentState].value,
          time: state.time.variants[state.time.currentState].value
        })}
      />
    </div>
  )
}

const useStyles = makeStyles(() => ({
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

export default MultiplayerSettings
