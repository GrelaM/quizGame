import React, { useContext, useState } from 'react'

export interface DataContextType {
  header: string
  nickname: string,
  gameId: string,
  artificialGameId: string,
  timer: number,
  questionNum?: number
  mode: string,
  roomId: string
}

export const initialState: DataContextType = {
    header: 'Quiz Game',
    nickname: 'Anonymous',
    gameId: '',
    artificialGameId: '#',
    timer: 15,
    questionNum: 0,
    mode: 'multiplayer',
    roomId: ''
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
