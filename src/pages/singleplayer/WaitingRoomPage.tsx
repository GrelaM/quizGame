import { Flex } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useGameState } from '../../providers/GlobalStateProvider'
import { Handlers as GlobalHandlers } from '../../functions/tools/global/contextReducer'

import PageLayout from '../../components/layout/PageLayout'
import LoadingSpinner from '../../components/layout/LoadingSpinner'
import Btn from '../../components/custom/button/Btn'
import IntervalCard from '../../components/custom/global/IntervalCard'

const WaitingRoomPage = () => {
  const history = useHistory()
  const [gameState, setGameState] = useGameState()
  const [counter, setCounter] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setGameState({
      type: GlobalHandlers.HEADER_HANDLER,
      value: `Game: ${gameState.singleGame.artificialGameId}`
    })
  }, [setGameState, gameState.singleGame.artificialGameId])

  useEffect(() => {
    let leftTime: number
    leftTime = 0

    const interval = setInterval(() => {
      if (leftTime < 3) {
        leftTime = leftTime + 1 / 10
        setCounter((cur) => cur + 100 / 3 / 10)
      } else {
        setIsLoading(true)
        clearInterval(interval)

        setTimeout(() => {
          history.push('/game')
        }, 1000)
      }
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [history])

  const leaveGameHandler = () => {
    window.localStorage.removeItem('game')
    history.push('/')
  }

  return (
    <PageLayout>
      <Flex
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        flex={1}
        w="100%"
      >
        <IntervalCard progress={counter} />
        <Btn
          name={'LEAVE GAME'}
          type={'aux'}
          clickHandler={leaveGameHandler}
          margin={'normal'}
        />
      </Flex>
      <LoadingSpinner toggleSpinner={isLoading} />
    </PageLayout>
  )
}

export default WaitingRoomPage
