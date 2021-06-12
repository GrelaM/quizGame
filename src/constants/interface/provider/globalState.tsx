export interface GlobalStateInterface {
  menu: {
    header: string
    activeBtnState: boolean
    toggleHeaderAlert: {
      type: undefined | 'info' | 'success' | 'error' | 'warning'
      status: boolean
      title: string
      message: string
      displayTimer: number
    }
  }
  user: {
    id: undefined | string
    status: undefined | 'host' | 'player'
    nickname: 'Anonymous' | string
  }
  game: {
    mode: undefined | 'single player' | 'multiplayer'
    dummyId: undefined | string 
    gameId: undefined | string
    roomId: undefined | string
    timer: undefined | number
    quantity: undefined | number
    level: undefined | number
  }
  alert: {
    type: undefined | 'info' | 'success' | 'error' | 'warning'
    status: boolean
    title: string
    message: string
    displayTimer: number
  }
  settings: {
    toggleLoading: boolean
    credentials: boolean
  }
}
