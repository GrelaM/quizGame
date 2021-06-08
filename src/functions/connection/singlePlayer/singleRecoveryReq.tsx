import axios from 'axios'

export const recoveryReq = async (gameId: string) => {
  let fechtedData
  await axios
    .get(`http://localhost:8080/game/${gameId}/recoveryprocess/`)
    .then((res) => {
      fechtedData = res.data
    })

  return fechtedData
}
