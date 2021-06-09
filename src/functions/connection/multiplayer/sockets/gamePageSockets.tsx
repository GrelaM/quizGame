// import {DataContextType} from '../../../../providers/GameStateProvider'
import SocketNames from '../../../../constants/socketNames'
import { QuestionPayload } from '../../../../constants/interfaces'
import {
  Handlers,
  Action,
  GameMode
} from '../../../tools/multiplayer/multiplayerGameReducer'

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
  dispatch: React.Dispatch<Action>
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
        value: {
          array: data.allPlayers,
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
  callBack: (message: string) => void
) => {
  socket.on(SocketNames.QUESTION, (data: QuestionPayload) => {
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
    callBack(message)
  })
}

export const onEndGameSocketHandler = (
  socket: any,
  dispatch: React.Dispatch<Action>
) => {
  socket.on(SocketNames.END_GAME, ({ status }: { status: boolean }) => {
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
