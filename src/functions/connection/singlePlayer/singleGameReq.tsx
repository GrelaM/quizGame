import axios from 'axios'

type RequestBody = {
  quantity: number
  time: number
  level: number
}

export const singleGameReq = async (
  questionNum: number,
  gameTimer: number,
  gameLevel: number
) => {
  const data: RequestBody = {
    quantity: questionNum,
    time: gameTimer,
    level: gameLevel
  }

  let serverData

  await axios
    .post('http://localhost:8080/game/newgame', data)
    .then((res) => {
      console.log(`${res.data.message} ID: ${res.data.artificialGameId}`)
      return (serverData = res)
    })

  return serverData
}
