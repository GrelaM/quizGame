import {Box} from '@chakra-ui/react'

import MainButton from '../../custom/MainButton'

interface RoomBtnDisplayProps {
    startGameBtnDisabled: boolean
    shareLinkBtnDisabled: boolean
    startGameBtnHandler: () => void
    shareLinkGameBtnHandler: () => void
}

const RoomBtnDisplay = (props: RoomBtnDisplayProps) => {
  return (
    <Box w="90%" maxW={300} marginTop={2}>
      <MainButton
        margin={'small'}
        disabled={props.startGameBtnDisabled}
        name={'start game'}
        type={'main'}
        clickHandler={props.startGameBtnHandler}
      />
      <MainButton
        margin={'small'}
        disabled={props.shareLinkBtnDisabled}
        name={'Share Link'}
        type={'main'}
        clickHandler={props.shareLinkGameBtnHandler}
      />
      <MainButton
        margin={'small'}
        disabled={false}
        type={'aux'}
        name={'terminate game'}
        clickHandler={() => console.log('End Game')}
      />
    </Box>
  )
}

export default RoomBtnDisplay
