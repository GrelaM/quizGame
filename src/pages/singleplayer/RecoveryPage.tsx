import { useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { useGameState } from '../../providers/GameStateProvider'
import { Box } from '@chakra-ui/react'

import LoadingSpinner from '../../components/chakra/components/layout/LoadingSpinner'
import PageLayout from '../../components/chakra/components/layout/PageLayout'
import Header from '../../components/chakra/components/custom/Header'
import MainButton from '../../components/chakra/components/custom/MainButton'
import RecoveryDisplay from '../../components/chakra/components/custom/DataDisplay'
import { recoveryPageReducerFunction } from '../../functions/tools/singlePlayer/recoveryPageReducer'
import { singleGameRecoveryReq } from '../../functions/other/singlePlayer/singleGameRecovery'

export interface RecoveryStateType {
  user: string
  artificialGameId: string
  gameId: string
  proceedGame: boolean
  isLoading: boolean
  recoveredData: boolean
  message: string
}

export interface LocalStorageType {
  user: string
  gameSettings: {
    artificialGameId: string
    gameId: string
    message: string
    timer: number
  }
}

export enum Handlers {
  PROCEED_GAME_HANDLER = 'PROCEED_GAME_HANDLER',
  RECOVERED_DATA_HANDLER = 'RECOVERED_DATA_HANDLER'
}

export const initialState: RecoveryStateType = {
  user: '',
  artificialGameId: '',
  gameId: '',
  proceedGame: false,
  isLoading: true,
  recoveredData: false,
  message: 'Please wait...'
}

const RecoveryPage = () => {
  const history = useHistory()
  const setGameState = useGameState()[1]
  const [state, dispatch] = useReducer(
    recoveryPageReducerFunction,
    initialState
  )

  useEffect(() => {
    const localStorage: LocalStorageType = JSON.parse(
      window.localStorage.getItem('game')!
    )
    setGameState((cur) => ({
      ...cur,
      nickname: localStorage.user,
      gameId: localStorage.gameSettings.gameId
    }))
    dispatch({ type: Handlers.RECOVERED_DATA_HANDLER, value: localStorage })
  }, [setGameState])

  useEffect(() => {
    if (state.gameId === '') return () => {}
    ;(async () => {
      const fetchedData = await singleGameRecoveryReq(state.gameId, dispatch)
      try {
        setGameState((cur) => ({
          ...cur,
          questionNum: fetchedData.nextQuestion
        }))
      } catch (e) {
        console.log(e)
      }
    })()
  }, [state.gameId, setGameState])

  const startNewGameHandler = () => {
    window.localStorage.removeItem('game')
    history.push('/')
  }

  return (
    <PageLayout>
      <Header />
      <RecoveryDisplay
        message={state.message}
        displayInfo={[
          { header: 'Game ID: ', message: state.artificialGameId },
          { header: 'Established by: ', message: state.user }
        ]}
        fetchedData={state.recoveredData}
      />
      <Box
        w="90%"
        maxW={300}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <MainButton
          type={'main'}
          disabled={!state.proceedGame}
          name={'Continue Game'}
          clickHandler={() => history.push('/waitingroom')}
        />
        <MainButton
          type={'aux'}
          name={'Start New Game'}
          clickHandler={startNewGameHandler}
        />
      </Box>
      {state.isLoading ? <LoadingSpinner /> : null}
    </PageLayout>
  )
}

export default RecoveryPage
