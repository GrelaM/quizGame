import { useHistory } from 'react-router-dom'
import { useGameState } from '../../providers/GlobalStateProvider'
import { Handlers as GlobalHandlers } from '../../functions/tools/global/contextReducer'
import { useState, useEffect } from 'react'
import queryString from 'query-string'

import PageLayout from '../../components/layout/PageLayout'
import Picture from '../../components/custom/global/Picture'
import Btn from '../../components/custom/button/Btn'
import CustomInput from '../../components/custom/global/CustomInput'

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
    setGlobalState({
      type: GlobalHandlers.JOIN_MULTIPLAYER_GAME,
      value: {
        gameId: gameId ? gameId.toString() : '',
        roomId: state.roomId,
        nickname: state.nickname,
        mode: 'multiplayer',
        status: 'player'
      }
    })
    history.push(`/multuplayer/game/${roomId}`)
  }

  useEffect(() => {
    setGlobalState({ type: GlobalHandlers.HEADER_HANDLER, value: 'player' })
  }, [setGlobalState])

  useEffect(() => {
    const id = idHandler(location.search)
    if (id !== '') {
      setState((cur) => ({ ...cur, roomId: id }))
    }
  }, [location.search])

  return (
    <PageLayout>
      <Picture type={'main'} size={'normal'} />
      <CustomInput
        isDisabled={false}
        maxLength={15}
        value={state.nickname}
        placeholder={'Enter your nickname...'}
        onChange={(e) => nickNameHandler(e)}
      />
      <CustomInput
        isDisabled={false}
        maxLength={15}
        value={state.roomId}
        placeholder={'Enter room ID...'}
        onChange={(e) => roomIdNameHandler(e)}
      />
      <Btn
        margin={'small'}
        type={'main'}
        disabled={state.nickname && state.roomId ? false : true}
        name={'Join Game'}
        clickHandler={joinGameHandler}
      />
    </PageLayout>
  )
}

export default JoinGame
