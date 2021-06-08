import { Flex, Box, Text, Skeleton } from '@chakra-ui/react'

import Picture from './Picture'

interface RecoveryDisplayProps {
  message: string
  displayInfo: {
    header: string
    message: string
  }[]
  fetchedData: boolean
}

const Display = (props: RecoveryDisplayProps) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      paddingTop={8}
      bg="rgba(255,255,255,0.3)"
      marginBlock={2}
      maxW={280}
      w="90%"
      borderRadius={8}
    >
      <Picture type="main" size="small" />
      <Box w="100%" paddingBottom={15}>
        <Text
          m={1}
          color={props.fetchedData ? 'secondary.dark' : 'primary.dark'}
          fontWeight={props.fetchedData ? 100 : 500}
        >
          {props.message}
        </Text>
        {props.displayInfo.map(
          (
            el: {
              header: string
              message: string
            },
            index: number
          ) => {
            return (
              <Flex
                m={1}
                justifyContent="center"
                alignItems="center"
                key={index}
              >
                <Text marginRight={2}>{el.header}</Text>
                <Text color="primary.dark" fontWeight="bold">
                  {el.message}
                </Text>
              </Flex>
            )
          }
        )}
      </Box>
      {props.fetchedData ? (
        <Skeleton
          height={2}
          w="100%"
          startColor="secondary.light"
          endColor="secondary.dark"
        />
      ) : null}
    </Flex>
  )
}

export default Display
