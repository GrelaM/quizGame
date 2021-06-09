import { QuestionPayload } from '../../../../constants/interfaces'
import SocketNames from '../../../../constants/socketNames'
import {
  Action,
  Handlers
} from '../../../tools/multiplayer/multiplayerRoomReducer'
import { LocalStorage } from '../../../../constants/localStorage'

export const hostSocketHandler = (
  socket: any,
  data: {
    gameId: string
    roomId: string
  },
  dispatch: React.Dispatch<Action>
) => {
  socket.emit(
    SocketNames.HOST,
    data,
    (fetchedData: {
      roomState: boolean
      alert: {
        showTimer: 2000,
        type: 'success' | 'info' | 'warning' | 'error' | undefined
        status: boolean
        title: string
        message: string
      }
    }) => {
      if (fetchedData) {
        dispatch({ type: Handlers.ON_OPEN_ROOM_HANDLER, value: fetchedData })
      }
    }
  )
}

export const playersUpdateSocketHandler = (
  socket: any,
  dispatch: React.Dispatch<Action>
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
        value: {
          allPlayers: data.allPlayers,
          alert: {
            showTimer: 1500,
            type: data.type,
            title: 'Update',
            message: data.message,
            status: true
          }
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
