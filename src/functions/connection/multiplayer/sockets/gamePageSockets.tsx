import SocketNames from '../../../../constants/socketNames'
import {
  QuestionPayload,
  GameMode
} from '../../../../constants/interface/global/game'
import { Handlers } from '../../../../constants/interface/multiplayerGame/gameHandler'
import { Action } from '../../../../constants/interface/multiplayerGame/gameAction'

import { GlobalHandler } from '../../../../constants/interface/provider/globalHandler'
import { GlobalAction } from '../../../../constants/interface/provider/globalAction'

export const onJoinSocketHandler = (
  socket: any,
  roomId: string,
  nickname: string
) => {
  socket.emit(SocketNames.JOIN, {
    room: roomId,
    nickname: nickname
  })
}

export const onPlayerUpdateSocketHandler = (
  socket: any,
  dispatch: React.Dispatch<Action>,
  setGlobalState: React.Dispatch<GlobalAction>
) => {
  socket.on(
    SocketNames.PLAYERS_UPDATE,
    (data: {
      type: 'success' | 'info' | 'warning' | 'error' | undefined
      title: string
      message: string
      allPlayers: string[]
    }) => {
      dispatch({
        type: Handlers.UPDATE_PLAYERS_HANDLERS,
        value: data.allPlayers
      })
      setGlobalState({
        type: GlobalHandler.MENU_ALERT_HANDLER,
        value: {
          type: data.type,
          title: 'Update',
          message: data.message,
          status: true,
          displayTimer: 2000
        }
      })
    }
  )
}

export const onGetReadySocketHandler = (
  socket: any,
  dispatch: React.Dispatch<Action>
) => {
  socket.on(
    SocketNames.COUNTER,
    ({ message, counter }: { message: string; counter: number }) => {
      dispatch({
        type: Handlers.ON_GET_READY_SOCKET_HANDLER,
        value: { message, counter }
      })
    }
  )
}

export const onQuestionHandler = (
  socket: any,
  dispatch: React.Dispatch<Action>,
  setGlobalState: React.Dispatch<GlobalAction>
) => {
  socket.on(SocketNames.QUESTION, (data: QuestionPayload) => {
    setGlobalState({
      type: GlobalHandler.SETTINGS_HANDLER,
      value: { toggleLoading: false, credentials: false }
    })
    let message: string = ''

    if (data.playerData.questionNumber < data.playerData.totalQuestions) {
      message = `Question #${data.playerData.questionNumber}`
    } else if (
      data.playerData.questionNumber === data.playerData.totalQuestions
    ) {
      message = 'Last question'
    }

    const payload = {
      questionUpadate: data.questionUpdate,
      playerUpadate: data.playerData,
      message: message
    }

    dispatch({ type: Handlers.ON_QUESTION_SOCKET_HANDLER, value: payload })
    setGlobalState({
      type: GlobalHandler.MENU_HANDLER,
      value: { header: message, activeState: true }
    })
  })
}

export const onEndGameSocketHandler = (
  socket: any,
  dispatch: React.Dispatch<Action>,
  setGlobalState: React.Dispatch<GlobalAction>
) => {
  socket.on(SocketNames.END_GAME, ({ status }: { status: boolean }) => {
    setGlobalState({
      type: GlobalHandler.SETTINGS_HANDLER,
      value: { toggleLoading: false, credentials: false }
    })
    dispatch({
      type: Handlers.RESULTS_ON_DISPLAY_HANDLER,
      value: GameMode.RESULTS
    })
  })
}

export const onResultsHandler = (
  socket: any,
  dispatch: React.Dispatch<Action>
) => {
  socket.on(
    SocketNames.RESULTS,
    (data: {
      results: {
        name: string
        correctAnswers: number
        totalQuestions: number
        points: number
      }[]
    }) => {
      dispatch({
        type: Handlers.RESULTS_HANDLER,
        value: { state: true, results: data.results }
      })
    }
  )
}
