import SocketNames from '../../../../constants/interface/global/socketNames'
import { QuestionPayload } from '../../../../constants/interface/global/game'
import { LocalStorage } from '../../../../constants/interface/global/localStorage'

import { Handlers } from '../../../../constants/interface/multiplayerRoom/roomHandler'
import { Action } from '../../../../constants/interface/multiplayerRoom/roomAction'

import { GlobalHandler } from '../../../../constants/interface/provider/globalHandler'
import { GlobalAction } from '../../../../constants/interface/provider/globalAction'

export const hostSocketHandler = (
  socket: any,
  data: {
    gameId: string
    roomId: string
  },
  dispatch: React.Dispatch<Action>,
  setGlobalState: React.Dispatch<GlobalAction>
) => {
  socket.emit(
    SocketNames.HOST,
    data,
    (fetchedData: {
      roomState: boolean
      alert: {
        type: 'success' | 'info' | 'warning' | 'error' | undefined
        status: boolean
        title: string
        message: string
      }
    }) => {
      if (fetchedData) {
        dispatch({
          type: Handlers.ON_OPEN_ROOM_HANDLER,
          value: fetchedData.roomState
        })
        setGlobalState({
          type: GlobalHandler.MENU_ALERT_HANDLER,
          value: {
            type: fetchedData.alert.type,
            status: fetchedData.alert.status,
            title: fetchedData.alert.title,
            message: fetchedData.alert.message,
            displayTimer: 3000
          }
        })
      }
    }
  )
}

export const playersUpdateSocketHandler = (
  socket: any,
  dispatch: React.Dispatch<Action>,
  setGlobalState: React.Dispatch<GlobalAction>
) => {
  socket.on(
    SocketNames.PLAYERS_UPDATE,
    (data: {
      type: 'success' | 'info' | 'warning' | 'error' | undefined
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

export const counterSocketHandler = (
  socket: any,
  dispatch: React.Dispatch<Action>
) => {
  socket.on(
    SocketNames.COUNTER,
    ({ message, counter }: { message: string; counter: number }) => {
      dispatch({
        type: Handlers.SOCKET_GET_READY_HANDLER,
        value: { message, counter }
      })
    }
  )
}

export const questionHostSocketHandler = (
  socket: any,
  dispatch: React.Dispatch<Action>
) => {
  socket.on(SocketNames.QUESTION, (data: QuestionPayload) => {
    let header: string

    if (data.host.questionsLeft > 1) {
      header = `Left #${data.host.questionsLeft}`
      dispatch({
        type: Handlers.SOCKET_HOST_QUESTION_HANDLER,
        value: {
          header: header,
          timer: data.host.timer,
          nextQuestion: data.questionUpdate
        }
      })
    } else if (data.host.questionsLeft === 1) {
      header = `Last question...`
      dispatch({
        type: Handlers.SOCKET_HOST_QUESTION_HANDLER,
        value: {
          header: header,
          timer: data.host.timer,
          nextQuestion: data.questionUpdate
        }
      })
    }
  })
}

export const onDisplayResultSocketHandler = (
  socket: any,
  dispatch: React.Dispatch<Action>
) => {
  socket.on(SocketNames.END_GAME, (data: { status: boolean }) => {
    dispatch({ type: Handlers.RESULTS_ON_DISPLAY_HANDLER, value: data.status })
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
      window.localStorage.removeItem(LocalStorage.MULTIPLAYER)
    }
  )
}
