import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalState } from '../../providers/StateProvider'
import { GlobalHandler } from '../../constants/interface/provider/globalHandler'
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
  const setGlobalState = useGlobalState()[1]
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
      type: GlobalHandler.GAME_HANDLER,
      value: {
        mode: 'multiplayer',
        gameId: gameId ? gameId.toString() : undefined,
        roomId: state.roomId,
        dummyId: state.roomId,
        quantity: undefined,
        timer: undefined,
        level: undefined
      }
    })
    setGlobalState({
      type: GlobalHandler.USER_HANDLER,
      value: {
        id: undefined,
        nickname: state.nickname,
        status: 'player'
      }
    })
    history.push(`/multiplayer/game/${roomId}`)
  }

  useEffect(() => {
    setGlobalState({
      type: GlobalHandler.MENU_HANDLER,
      value: { header: 'player', activeState: true }
    })
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
