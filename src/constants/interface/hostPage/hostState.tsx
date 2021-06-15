export interface HostPageInterface {
    display: {
      message: string
      header: string
      roomId: string
    }
    shouldGo: boolean
    localStorageAlert: boolean
    mode: number
  }