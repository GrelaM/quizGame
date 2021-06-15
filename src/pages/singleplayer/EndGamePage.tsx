import { Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { LocalStorage } from '../../constants/interface/global/localStorage'
import { useGlobalState } from '../../providers/StateProvider'
import { GlobalHandler } from '../../constants/interface/provider/globalHandler'

import { getResultHandler } from '../../functions/other/singlePlayer/resultsHandlers'

import PageLayeout from '../../components/layout/PageLayout'
import Picture from '../../components/custom/global/Picture'
import Column from '../../components/layout/Column'
import Btn from '../../components/custom/button/Btn'
import StarLayout from '../../components/layout/StarLayout'

const EndGamePage = () => {
  const history = useHistory()
  const [state, setState] = useState({
    points: 0,
    correctAnswers: 0,
    questionQuantity: 0
  })
  const [globalState, setGlobalState] = useGlobalState()

  const gameId = globalState.game.gameId ? globalState.game.gameId : ''

  useEffect(() => {
    getResultHandler(
      gameId,
      (points: number, correctAnswers: number, questionQuantity: number) =>
        setState({
          points: points,
          correctAnswers: correctAnswers,
          questionQuantity: questionQuantity
        }),
      setGlobalState,
      () => window.localStorage.removeItem(LocalStorage.SINGLE_GAME)
    )
  }, [gameId, setGlobalState])

  const newGameHandler = () => {
    setGlobalState({ type: GlobalHandler.RESET_HANDLER })
    window.localStorage.removeItem(LocalStorage.SINGLE_GAME)
    history.push('/')
  }

  return (
    <PageLayeout>
      {globalState.settings.toggleLoading ? null : (
        <Column>
          <Picture type={'result'} size={'small'} />
          <Flex
            w="100%"
            maxW={280}
            direction="column"
            justifyContent="center"
            alignItems="center"
            borderRadius={10}
            bg={'rgba(255,255,255,0.35)'}
            paddingBlock={4}
            paddingInline={1}
            marginBlock={4}
            boxShadow="lg"
          >
            <Flex
              w="100%"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              fontSize="1.2em"
              fontWeight="bold"
              color="secondary.dark"
            >
              <Text mb={2} color="secondary.dark">
                Congratulations
              </Text>
              <StarLayout>
                <Text marginInline={1} color="primary.dark">
                  {globalState.user.nickname}
                </Text>
              </StarLayout>
            </Flex>
            <Flex
              w="100%"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              fontSize="1.1em"
              color="text.primary.700"
              mt={1}
            >
              <Text marginInline={1} fontWeight="400">
                You've collected
              </Text>
              <Text marginInline={1} color="primary.dark" fontWeight="800">
                {state.points}
              </Text>
              points!
            </Flex>
            <Flex
              w="100%"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              fontSize="1em"
              color="text.primary.700"
              marginBlock={1}
            >
              <Text marginInline={1} fontWeight="400">
                You gave:
              </Text>
              <Text marginInline={1} color="primary.dark" fontWeight="650">
                {state.correctAnswers} / {state.questionQuantity}
              </Text>
              correct answers.
            </Flex>
          </Flex>
          <Btn
            name={'New Game'}
            type={'main'}
            clickHandler={newGameHandler}
            margin={'normal'}
          />
        </Column>
      )}
    </PageLayeout>
  )
}

export default EndGamePage
