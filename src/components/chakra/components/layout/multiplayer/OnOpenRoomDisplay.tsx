import { Flex } from '@chakra-ui/react'

import DataDisplay from '../../custom/DataDisplay'
import MainButton from '../../custom/MainButton'

interface OnOpenRoomDisplayProps {
  message: string
  displayInfo: { header: string; message: string }[]
  fetchedData: boolean
  gameState: boolean
  openRoomHandler: () => void
  goBackHandler: () => void
}

const OnOpenRoomDisplay = (props: OnOpenRoomDisplayProps) => {
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
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        w="100%"
        maxW="320"
      >
        <MainButton
          type={'main'}
          disabled={!props.gameState}
          name={'Open Room'}
          clickHandler={props.openRoomHandler}
        />
        <MainButton
          type={'aux'}
          name={'Back'}
          clickHandler={props.goBackHandler}
        />
      </Flex>
    </Flex>
  )
}

export default OnOpenRoomDisplay
