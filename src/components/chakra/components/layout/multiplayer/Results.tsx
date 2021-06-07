import { Flex } from '@chakra-ui/react'

import Picture from '../../custom/Picture'
import ResultBox from './ResultBox'
import MainButton from '../../custom/MainButton'

interface ResultsProps {
  results: {
    name: string
    correctAnswers: number
    totalQuestions: number
    points: number
  }[]
  resultsState: boolean
  clickHandler: () => void
}

const Results = (props: ResultsProps) => {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <Picture size={'normal'} type={'result'} />
      <ResultBox results={props.results} resultsState={props.resultsState} />
      <Flex w={'80%'} maxW={300} justifyContent="center" alignItems="center">
        <MainButton type={'aux'} name={'Home'} clickHandler={props.clickHandler} />
      </Flex>
    </Flex>
  )
}

export default Results
