import { Flex, Spinner, Text } from '@chakra-ui/react'

import { useGlobalState } from '../../providers/StateProvider'

const LoadingSpinner = () => {
  const globalState = useGlobalState()[0]
  return (
    <Flex
      display={globalState.settings.toggleLoading ? 'flex' : 'none'}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      top={0}
      w="100%"
      h="100%"
      bg="rgba(0,0,0,0.75)"
      color="secondary.main"
      zIndex={800}
    >
      <Spinner size="xl" />
      <Text letterSpacing={1} m={4} fontWeight="550">
        Please wait...
      </Text>
    </Flex>
  )
}

export default LoadingSpinner
