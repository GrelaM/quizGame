import { Flex } from '@chakra-ui/react'

const MainBtnLayout = (props: { children: React.ReactNode }) => {
  return (
    <Flex
      marginBlock={1}
      w={['80%', '60%', '40%']}
      display="flex"
      flex={1}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {props.children}
    </Flex>
  )
}

export default MainBtnLayout
