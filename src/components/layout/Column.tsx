import { Flex } from '@chakra-ui/react'

const ColumnLayout = (props: { children: React.ReactNode }) => {
  return (
    <Flex direction="column" justifyContent="flex-start" alignItems="center" w="inherit">
      {props.children}
    </Flex>
  )
}

export default ColumnLayout
