import { Flex } from '@chakra-ui/react'

import DataDisplay from '../global/GameInfoDisplay'
import Btn from '../button/Btn'

interface OnOpenRoomDisplayProps {
  message: string
  displayInfo: { header: string; message: string }[]
  fetchedData: boolean
  gameState: boolean
  openRoomHandler: () => void
  goBackHandler: () => void
}

const RoomInfoDisplay = (props: OnOpenRoomDisplayProps) => {
  return (
    <Flex
      w="100%"
      maxW="320"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <DataDisplay
        message={props.message}
        displayInfo={props.displayInfo}
        fetchedData={props.fetchedData}
      />
      <Btn
        margin={'normal'}
        type={'main'}
        disabled={!props.gameState}
        name={'Open Room'}
        clickHandler={props.openRoomHandler}
      />
    </Flex>
  )
}

export default RoomInfoDisplay
