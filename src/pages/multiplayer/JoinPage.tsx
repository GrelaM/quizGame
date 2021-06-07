import { Box } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { useGameState } from '../../providers/GameStateProvider'
import { useState, useEffect } from 'react'
import queryString from 'query-string'

import PageLayout from '../../components/chakra/components/layout/PageLayout'
import Header from '../../components/chakra/components/custom/Header'
import Picture from '../../components/chakra/components/custom/Picture'
import MainButton from '../../components/chakra/components/custom/MainButton'
import TextInput from '../../components/chakra/components/custom/TextInput'

const idHandler = (urlparams: any) => {
  let id: string
  const query = queryString.parse(urlparams)
  if (query.roomid) {
    id = '#'.concat(query.roomid.toString())
    return id
  } else {
    return (id = '')
  }
}

const JoinGame = ({ location }: any) => {
  const history = useHistory()
  const setGlobalState = useGameState()[1]
  const [state, setState] = useState<{ nickname: string; roomId: string }>({
    nickname: '',
    roomId: ''
  })

  const nickNameHandler = (e: any) => {
    setState((cur) => ({ ...cur, nickname: e }))
  }

  const roomIdNameHandler = (e: any) => {
    setState((cur) => ({ ...cur, roomId: e }))
  }

  const joinGameHandler = () => {
    const query = queryString.parse(location.search)
    const roomId = query.roomid
    const gameId = query.gameid

    setGlobalState((cur) => ({
      ...cur,
      nickname: state.nickname,
      roomId: state.roomId,
      gameId: gameId!.toString()
    }))
    history.push(`/multuplayer/game/${roomId}`)
  }

  useEffect(() => {
    setGlobalState((cur) => ({ ...cur, header: 'player' }))
  }, [setGlobalState])

  useEffect(() => {
    const id = idHandler(location.search)
    if (id !== '') {
      setState((cur) => ({ ...cur, roomId: id }))
    }
  }, [location.search])

  return (
    <PageLayout>
      <Header />
      <Picture type={'main'} size={'small'} />
      <Box w="90%" maxW={300} margin={2}>
        <TextInput
          value={state.nickname}
          placeholder={'Enter your nickname...'}
          onChange={(e) => nickNameHandler(e)}
        />
        <TextInput
          value={state.roomId}
          placeholder={'Enter room ID...'}
          onChange={(e) => roomIdNameHandler(e)}
        />
      </Box>
      <Box w="90%" maxW={300} margin={2}>
        <MainButton
          margin={'small'}
          type={'main'}
          disabled={state.nickname && state.roomId ? false : true}
          name={'Join Game'}
          clickHandler={joinGameHandler}
        />
        <MainButton
          margin={'small'}
          type={'aux'}
          name={'Back'}
          clickHandler={() => history.goBack()}
        />
      </Box>
    </PageLayout>
  )
}

export default JoinGame
