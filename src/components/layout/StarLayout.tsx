import { StarIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'

const StarLayout = (props: { children: React.ReactNode }) => {
  return (
    <Flex justifyContent="center" alignItems="center" w="100%">
      <StarIcon w={3} h={3} marginTop={1} marginInline={3} />
      {props.children}
      <StarIcon w={3} h={3} marginTop={1} marginInline={3} />
    </Flex>
  )
}

export default StarLayout
