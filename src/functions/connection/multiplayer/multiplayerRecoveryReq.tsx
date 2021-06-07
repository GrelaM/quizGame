import axios from 'axios'

export const recoveryReq = async (gameId: string) => {
  try {
    const fetchedData = await axios.get(
      `http://localhost:8080/game/multiplayer/${gameId}/recoveryprocess/`
    )
    return fetchedData
  } catch (e) {
    return e
  }
}
