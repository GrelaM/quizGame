import { Flex, Text, Box } from '@chakra-ui/react'

import SingleResult from '../../custom/SingleResult'

interface HostResultsProps {
  results: {
    name: string
    correctAnswers: number
    totalQuestions: number
    points: number
  }[]
  resultsState: boolean
}

const HostResults = (props: HostResultsProps) => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
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
          results
        </Text>
      </Box>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        w="100%"
        paddingBlock={2}
      >
        {!props.resultsState ? <Box color={"secondary.dark"} letterSpacing={1}>Please wait...</Box>: null}
        {props.results.map((el, index) => {
          return (
            <SingleResult
              bg={'host'}
              key={index}
              name={el.name}
              correctAnswers={el.correctAnswers}
              totalQuestions={el.totalQuestions}
              points={el.points}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default HostResults
