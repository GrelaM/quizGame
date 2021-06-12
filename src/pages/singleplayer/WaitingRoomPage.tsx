import { Flex } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalState } from '../../providers/StateProvider'
import { GlobalHandler } from '../../constants/interface/provider/globalHandler'

import PageLayout from '../../components/layout/PageLayout'
import Btn from '../../components/custom/button/Btn'
import IntervalCard from '../../components/custom/global/IntervalCard'

const WaitingRoomPage = () => {
  const history = useHistory()
  const [gameState, setGameState] = useGlobalState()
  const [counter, setCounter] = useState<number>(0)

  useEffect(() => {
    setGameState({
      type: GlobalHandler.MENU_HANDLER,
      value: {
        header: `Game: ${gameState.game.dummyId}`,
        activeState: true
      }
    })
  }, [setGameState, gameState.game.dummyId])

  useEffect(() => {
    let leftTime: number
    leftTime = 0

    const interval = setInterval(() => {
      if (leftTime < 3) {
        leftTime = leftTime + 1 / 10
        setCounter((cur) => cur + 100 / 3 / 10)
      } else {
        setGameState({type: GlobalHandler.SETTINGS_HANDLER, value: {
          toggleLoading: true, credentials: false
        }})
        clearInterval(interval)

        setTimeout(() => {
          history.push('/game')
        }, 1000)
      }
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [setGameState, history])

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
        paddingBlock={2}
      >
        <IntervalCard progress={counter} />
        <Btn
          name={'LEAVE GAME'}
          type={'aux'}
          clickHandler={leaveGameHandler}
          margin={'normal'}
        />
      </Flex>
    </PageLayout>
  )
}

export default WaitingRoomPage
