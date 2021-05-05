import { InitialStateType, Handlers } from '../../pages/StartPage'

export const startPageReducerFunction = (
  state: InitialStateType,
  action: { type: Handlers; value: string | number }
): InitialStateType => {
  switch (action.type) {
    case Handlers.GAMEMODE_HANDLER:
      return { ...state, gameMode: Number(action.value) }
    case Handlers.NICKNAME_HANDLER:
      return { ...state, nickname: action.value.toString() }
    case Handlers.TIMER_HANDLER:
      return { ...state, timer: action.value.toString() }
    case Handlers.QUANTITY_HANDLER:
      return { ...state, quantity: action.value.toString() }
    case Handlers.LEVEL_HANDLER:
      return { ...state, level: action.value.toString() }
  }
}
