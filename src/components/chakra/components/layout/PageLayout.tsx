import { Flex } from '@chakra-ui/react'

const PageLayout = (props: { children: React.ReactNode }) => {
  return (
    <Flex
      flex={1}
      flexDirection="column"
      justifyContent="flex-start"
      align="center"
      w={'100%'}
    >
      {props.children}
    </Flex>
  )
}

export default PageLayout
