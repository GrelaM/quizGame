import { Flex, Text, Box } from '@chakra-ui/react'

const PlayerDisplay = (props: { playersArray: string[], noPlayersMessage?: string }) => {
  return (
    <Flex
      direction="column"
      justifyContent="start-flex"
      alignItems="center"
      w="100%"
    >
      <Box w="95%">
        <Text
          textTransform="uppercase"
          borderBottom="1px solid"
          borderColor="rgba(0,0,0,0.4)"
          paddingBlock={2}
          letterSpacing={4}
          color="text.primary.700"
        >
          players
        </Text>
      </Box>
      <Flex
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        w="95%"
        marginTop={1}
      >
        {props.playersArray.length <= 0 ? (
          <Text color="text.primary.650" p={1} m={1} letterSpacing={1}>
            {props.noPlayersMessage ? props.noPlayersMessage : 'The room is empty...'}
          </Text>
        ) : (
          props.playersArray.map((el, index) => {
            return (
              <Box
                marginBlock={1}
                marginInline={2}
                key={index}
                bg="primary.main"
                p={1}
                borderRadius={5}
              >
                <Text color="text.primary.500" letterSpacing={2.5}>
                  {el}
                </Text>
              </Box>
            )
          })
        )}
      </Flex>
    </Flex>
  )
}

export default PlayerDisplay
