import { InitialStateType, Handlers } from '../pages/StartPage'

export const startPageReducerFunction = (
  state: InitialStateType,
  action: { type: Handlers; value: string | number }
) => {
  switch (action.type) {
    case Handlers.GAMEMODE_HANDLER:
      return { ...state }
    case Handlers.NICKNAME_HANDLER:
      return { ...state }
    case Handlers.TIMER_HANDLER:
      return { ...state }
    case Handlers.QUANTITY_HANDLER:
      return { ...state }
    case Handlers.LEVEL_HANDLER:
      return { ...state }
  }
}
