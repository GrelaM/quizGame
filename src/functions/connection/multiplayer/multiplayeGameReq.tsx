import axios from 'axios'

type RequestBody = {
  quantity: number
  time: number
  level: number
}

export const multiplayerGameReq = async (data: RequestBody) => {
  try {
    const gameReq = await axios.post(
      'http://localhost:8080/game/newgame/multiplayer',
      data
    )
    return gameReq
  } catch (e) {
    throw e
  }
}
