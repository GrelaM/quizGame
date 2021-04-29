import React, { useContext, useState } from 'react'

interface DataContextType {
  header: string
  nickname: string,
  gameId: string,
  timer: number,
  questionNum?: number
}

const initialState = {
    header: 'Quiz Game',
    nickname: 'Anonymous',
    gameId: '',
    timer: 0,
    questionNum: 0
  }

const GameStateContext = React.createContext<
  [
    DataContextType,
    React.Dispatch<React.SetStateAction<DataContextType>>
  ]
>([initialState, ()=>{}])

export const useGameState = () => useContext(GameStateContext)

const GameStateProvider = (props: any) => {
  const [contextState, setContextState] = useState<DataContextType>(initialState)

  return (
    <GameStateContext.Provider value={[contextState, setContextState]}>
      {props.children}
    </GameStateContext.Provider>
  )
}

export default GameStateProvider
