import { Flex } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { useGameState } from '../../providers/GameStateProvider'

import PageLayout from '../../components/chakra/components/layout/PageLayout'
import Header from '../../components/chakra/components/custom/Header'
import Picture from '../../components/chakra/components/custom/Picture'
import MainButton from '../../components/chakra/components/custom/MainButton'

const MultiplayerMode = () => {
  const history = useHistory()
  const setGlobalState = useGameState()[1]

  useEffect(() => {
    setGlobalState((current) => ({ ...current, header: 'Multiplayer' }))
  }, [setGlobalState])

  return (
    <PageLayout>
      <Header />
      <Picture size="normal" type="main" />
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        w="90%"
        maxW={300}
      >
        <MainButton
          margin="small"
          type="main"
          name={'Host Game'}
          clickHandler={() => history.push('/hosting')}
        />
        <MainButton
          margin="small"
          type="main"
          name={'Join'}
          clickHandler={() => history.push('/join')}
        />
        <MainButton
          margin="small"
          type="aux"
          name={'Back'}
          clickHandler={() => history.goBack()}
        />
      </Flex>
    </PageLayout>
  )
}

export default MultiplayerMode
