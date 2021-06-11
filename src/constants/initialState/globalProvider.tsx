import { GlobalStateInterface } from '../interface/provider/globalState'

export const initialState: GlobalStateInterface = {
  menu: {
    header: 'quiz game',
    activeBtnState: true,
    toggleHeaderAlert: {
      type: undefined,
      status: false,
      title: '',
      message: '',
      displayTimer: 1000
    }
  },
  user: {
    id: undefined,
    status: undefined,
    nickname: 'Anonymous'
  },
  game: {
    mode: undefined,
    gameId: undefined,
    roomId: undefined,
    timer: undefined,
    quantity: undefined,
    level: undefined
  },
  alert: {
    type: undefined,
    status: false,
    title: '',
    message: '',
    displayTimer: 1000
  }
}
