import axios from 'axios'

export type ResultsType = {
  points: number
  correctAnswers: number
  questionQuantity: number
}

export const fetchResultsHandler = async (gameId: string) => {
  const id = gameId
  try {
    const fetchedData = await axios.get(
      `http://localhost:8080/results/singlegame/${id}`
    )
    return fetchedData
  } catch (e) {
    throw e
  }
}
