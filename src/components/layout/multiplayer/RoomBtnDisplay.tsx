import { Box } from '@chakra-ui/react'

import Btn from '../../custom/button/Btn'

interface RoomBtnDisplayProps {
  onResults: boolean
  startGameBtnDisabled: boolean
  shareLinkBtnDisabled: boolean
  startGameBtnHandler: () => void
  shareLinkGameBtnHandler: () => void
  startNewGameHandler: () => void
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
      {props.onResults ? (
        <Box w="100%">
          <Btn
            margin={'small'}
            disabled={false}
            type={'aux'}
            name={'Start New Game'}
            clickHandler={props.startNewGameHandler}
          />
        </Box>
      ) : null}
    </Box>
  )
}

export default RoomBtnLayout
