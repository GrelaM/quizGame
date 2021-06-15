import { HostPageInterface } from '../interface/hostPage/hostState'

export const initialState: HostPageInterface = {
  display: {
    message: 'Please wait...',
    header: 'Room: ',
    roomId: 'will be created soon...'
  },
  shouldGo: false,
  localStorageAlert: false,
  mode: 0
}
