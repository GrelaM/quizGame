import axios from 'axios'

export const singleAnswerRes = async (
  gameId: string,
  question: number,
  data: {
    code: number
    value: string
  }
) => {
  try {
    const fetchedData = await axios.post(
      `http://localhost:8080/singleplayer/game/${gameId}/question/${question}`,
      data
    )
    return fetchedData
  } catch (e) {
    throw (e)
  }
}
