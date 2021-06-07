import { Flex, Text, Progress } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import PlayerDisplay from '../../custom/multiplayer/PlayersDisplay'
import HostResults from './HostResults'

interface RoomStatusDislpayProps {
  roomName: string
  roomState: boolean
  headerDisplay: string
  playersArray: string[]
  counter: number
  resultsOnDisplay: boolean
  resultsState: boolean
  results: {
    name: string
    correctAnswers: number
    totalQuestions: number
    points: number
  }[]
}

const RoomStatusDislpay = (props: RoomStatusDislpayProps) => {
  return (
    <Flex
      w="100%"
      maxW={300}
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      flex={1}
      bg="rgba(255,255,255,0.2)"
      borderRadius={5}
      margin={2}
    >
      {/*Room display*/}
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        w="100%"
        bg={props.roomState ? 'primary.main' : 'secondary.main'}
        color={props.roomState ? 'text.secondary.750' : 'text.primary.500'}
        paddingTop={3}
        borderTopRadius={5}
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          w="inherit"
          fontWeight="bold"
          letterSpacing={2}
        >
          <Text textTransform="uppercase" marginInline={2}>
            room:
          </Text>
          <Text textTransform="uppercase" marginInline={2}>
            {props.roomName}
          </Text>
        </Flex>
        {/*Header display*/}
        <Flex justifyContent="center" alignItems="center">
          <StarIcon w={3} h={3} marginTop={1} marginInline={3} />
          <Text textTransform="capitalize" letterSpacing={2} paddingTop={1}>
            {props.headerDisplay}
          </Text>
          <StarIcon w={3} h={3} marginTop={1} marginInline={3} />
        </Flex>
        {/*Counter display*/}
        <Progress
          value={props.counter}
          w="100%"
          colorScheme="yellow"
          marginTop={2}
          size="sm"
          bg="rgba(0,0,0,0.15)"
        />
      </Flex>
      {/*Player and Result display*/}
      <PlayerDisplay playersArray={props.playersArray} />
      {props.resultsOnDisplay ? (
        <HostResults
          results={props.results}
          resultsState={props.resultsState}
        />
      ) : null}
    </Flex>
  )
}

export default RoomStatusDislpay
