import { Flex, Box } from '@chakra-ui/react'

import SingleResult from '../../custom/SingleResult'

interface ResultBoxProps {
  results: {
    name: string
    correctAnswers: number
    totalQuestions: number
    points: number
  }[]
  resultsState: boolean
}

const ResultBox = (props: ResultBoxProps) => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      w={'90%'}
      maxW={400}
      bg="secondary.light"
      marginBlock={2}
      paddingBlock={2}
      borderRadius={10}
    >
      {!props.resultsState ? <Box color={"secondary.dark"} letterSpacing={1}>Please wait...</Box>: null}
      {props.results.map((el, index) => {
        return (
          <SingleResult
            key={index}
            name={el.name}
            correctAnswers={el.correctAnswers}
            totalQuestions={el.totalQuestions}
            points={el.points}
          />
        )
      })}
    </Flex>
  )
}

export default ResultBox
