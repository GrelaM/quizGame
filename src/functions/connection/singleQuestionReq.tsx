import axios from 'axios'

export const singleQuestionReq = async (gameId: string) => {
  try {
      const fetchedData = await axios.get(
      `http://localhost:8080/singleplayer/game/${gameId}`
    )
    return fetchedData
  } catch(e) {
      console.log(e)
  }
}
