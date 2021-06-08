import { Flex } from '@chakra-ui/react'

import Picture from '../../custom/global/Picture'
import ResultBox from './ResultBox'
import Btn from '../../custom/button/Btn'

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
      <Btn
        type={'aux'}
        name={'Home'}
        clickHandler={props.clickHandler}
        margin={'normal'}
      />
    </Flex>
  )
}

export default Results
