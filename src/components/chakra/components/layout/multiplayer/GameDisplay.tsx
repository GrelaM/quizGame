import { Flex } from '@chakra-ui/react'
import QCard from '../../custom/QuestionCard'
import GameBtnArena from '../../layout/GameBtnArena'

interface GameDisplayProps {
    hints: string[]
    question: string
    progress: number
    answers: {code: number, value: string}[]
    btnHandler: (answer: {code: number, value: string}) => void
    passedCode: number
}

const GameDisplay = (props: GameDisplayProps) => {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <QCard hints={props.hints} question={props.question} progress={props.progress} />
      <GameBtnArena
        answers={props.answers}
        btnHandler={props.btnHandler}
        passedCode={props.passedCode}
      />
    </Flex>
  )
}

export default GameDisplay
