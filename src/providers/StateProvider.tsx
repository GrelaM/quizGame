import React, { createContext, useContext, useReducer } from 'react'
import { GlobalStateInterface } from '../constants/interface/provider/globalState'
import { GlobalAction } from '../constants/interface/provider/globalAction'
import { initialState } from '../constants/initialState/globalProvider'
import { globalReducer } from '../functions/tools/global/globalReducer'

const StateContext = createContext<
  [GlobalStateInterface, React.Dispatch<GlobalAction>]
>([initialState, () => {}])

export const useGlobalState = () => useContext(StateContext)

const StateProvider = (props: any) => {
  const [contextState, dispatch] = useReducer(globalReducer, initialState)

  return (
    <StateContext.Provider value={[contextState, dispatch]}>
      {props.children}
    </StateContext.Provider>
  )
}

export default StateProvider
