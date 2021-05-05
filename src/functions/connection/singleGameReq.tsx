import axios from 'axios'

type RequestBody = {
  quantity: number
  time: number
  level: number
}

const levelHandler = (level: string) => {
  switch (level) {
    case 'EASE':
      return 1
    case 'MEDIUM':
      return 2
    case 'HARD':
      return 3
    default:
      return 1
  }
}

export const singleGameReq = async (
  questionNum: number,
  gameTimer: number,
  gameLevel: string
) => {
  const data: RequestBody = {
    quantity: questionNum,
    time: gameTimer,
    level: levelHandler(gameLevel)
  }

  let serverData

  await axios
    .post('http://localhost:8080/game/newgame', data)
    .then((res) => {
      console.log(`${res.data.message} ID: ${res.data.artificialGameId}`)
      return (serverData = res)
    })
    .catch((err) => console.log(err))

  return serverData
}
