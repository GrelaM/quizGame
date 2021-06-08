import {Box} from '@chakra-ui/react'

import Btn from '../../custom/button/Btn'

interface RoomBtnDisplayProps {
    startGameBtnDisabled: boolean
    shareLinkBtnDisabled: boolean
    startGameBtnHandler: () => void
    shareLinkGameBtnHandler: () => void
}

const RoomBtnLayout = (props: RoomBtnDisplayProps) => {
  return (
    <Box w="90%" maxW={300} m={1}>
      <Btn
        margin={'small'}
        disabled={props.startGameBtnDisabled}
        name={'start game'}
        type={'main'}
        clickHandler={props.startGameBtnHandler}
      />
      <Btn
        margin={'small'}
        disabled={props.shareLinkBtnDisabled}
        name={'Share Link'}
        type={'main'}
        clickHandler={props.shareLinkGameBtnHandler}
      />
      <Btn
        margin={'small'}
        disabled={false}
        type={'aux'}
        name={'terminate game'}
        clickHandler={() => console.log('End Game')}
      />
    </Box>
  )
}

export default RoomBtnLayout
