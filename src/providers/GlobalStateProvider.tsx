import React, { useContext, useReducer } from 'react'
import {
  initialState,
  globalContextReducer,
  GlobalStateContextType,
  Action
} from '../functions/tools/global/contextReducer'

const GameStateContext = React.createContext<
  [GlobalStateContextType, React.Dispatch<Action>]
>([initialState, () => {}])

export const useGameState = () => useContext(GameStateContext)

const GameStateProvider = (props: any) => {
  const [contextState, dispatch] = useReducer(
    globalContextReducer,
    initialState
  )

  return (
    <GameStateContext.Provider value={[contextState, dispatch]}>
      {props.children}
    </GameStateContext.Provider>
  )
}

export default GameStateProvider
