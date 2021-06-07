import { Flex, Spinner } from "@chakra-ui/react"

const LoadingSpinner = () => {
  return (
    <Flex 
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      top={0}
      w="100%"
      h="100%"
      bg="rgba(0,0,0,0.45)"
    >
      <Spinner color="secondary.main" size="xl"/>
    </Flex>
  )
}

export default LoadingSpinner
