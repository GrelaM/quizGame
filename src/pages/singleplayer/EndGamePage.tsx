import { Flex, Text } from '@chakra-ui/react'
import { useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { useGameState } from '../../providers/GlobalStateProvider'
import { Handlers as GlobalHandlers } from '../../functions/tools/global/contextReducer'
import { LocalStorage } from '../../constants/localStorage'

import { getResultHandler } from '../../functions/other/singlePlayer/resultsHandlers'
import {
  Handlers,
  initialState,
  resultReducer
} from '../../functions/tools/singlePlayer/resultsReducer'

import PageLayeout from '../../components/layout/PageLayout'
import Picture from '../../components/custom/global/Picture'
import Column from '../../components/layout/Column'
import Btn from '../../components/custom/button/Btn'
import StarLayout from '../../components/layout/StarLayout'
import LoadingSpinner from '../../components/layout/LoadingSpinner'

const EndGamePage = () => {
  const history = useHistory()
  const [state, dispatch] = useReducer(resultReducer, initialState)
  const [useGlobalState, setUseGlobalState] = useGameState()

  const gameId = useGlobalState.singleGame.gameId

  useEffect(() => {
    getResultHandler(gameId, dispatch, setUseGlobalState, () =>
      window.localStorage.removeItem(LocalStorage.SINGLE_GAME)
    )
  }, [gameId, setUseGlobalState])

  const newGameHandler = () => {
    setUseGlobalState({ type: GlobalHandlers.RESET_STATE })
    window.localStorage.removeItem(LocalStorage.SINGLE_GAME)
    history.push('/')
  }

  const errorHandler = () => {
    window.localStorage.removeItem(LocalStorage.SINGLE_GAME)
    dispatch({ type: Handlers.TOGGLE_ALERT_HANDLER, value: false })
    setUseGlobalState({ type: GlobalHandlers.CLEAR_ALERT_HANDLER })
    history.push('/')
  }

  return (
    <PageLayeout>
      {state.isLoading ? (
        <LoadingSpinner toggleSpinner={state.isLoading} />
      ) : (
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
                  {useGlobalState.user.nickname}
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
                {state.gameResults.points}
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
                {state.gameResults.correctAnswers} /{' '}
                {state.gameResults.questionQuantity}
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
