import { Flex, Spinner, Text } from '@chakra-ui/react'

const LoadingSpinner = (props: { toggleSpinner: boolean }) => {
  return (
    <Flex
      display={props.toggleSpinner ? 'flex' : 'none'}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      top={0}
      w="100%"
      h="100%"
      bg="rgba(0,0,0,0.75)"
      color="secondary.main"
    >
      <Spinner size="xl" />
      <Text letterSpacing={1} m={4} fontWeight="550">
        Please wait...
      </Text>
    </Flex>
  )
}

export default LoadingSpinner
