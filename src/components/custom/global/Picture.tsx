import { Box, Image } from '@chakra-ui/react'

import GameImage from '../../../assets/img/questionSmall.png'
import SmileFace from '../../../assets/img/smile.jpg'

const Picture = (props: {
  type: 'result' | 'main'
  size: 'normal' | 'small'
}) => {
  return (
    <Box
      paddingBlock={1}
      bg="primary.gradient"
      w="80%"
      maxW={props.size === 'normal' ? 300 : 150}
      maxH={props.size === 'normal' ? 300 : 150}
      borderRadius="full"
      display="flex"
      justifyContent="center"
      alignItems="center"
      m={props.size === 'normal' ? 2 : 1}
    >
      <Image
        borderRadius="full"
        boxSize="95%"
        src={props.type !== 'result' ? GameImage : SmileFace}
        alt="Quiz Pic"
      />
    </Box>
  )
}

export default Picture
