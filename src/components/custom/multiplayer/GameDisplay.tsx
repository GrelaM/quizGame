import { Flex } from '@chakra-ui/react'

import QCard from '../../custom/global/QuestionCard'
import IntervalCard from '../../custom/global/IntervalCard'
import GameBtnArena from '../../layout/GameBtnLayout'

interface GameDisplayProps {
  hints: string[]
  question: string
  progress: number
  answers: { code: number; value: string }[]
  btnHandler: (answer: { code: number; value: string }) => void
  passedCode: number
}

const GameDisplay = (props: GameDisplayProps) => {
  let mode = (
    <Flex direction="column" justifyContent="center" alignItems="center" w="100%">
      <IntervalCard progress={props.progress} />
    </Flex>
  )
  if (props.hints.length > 0) {
    mode = (
      <Flex direction="column" justifyContent="center" alignItems="center" w="100%">
        <QCard
          hints={props.hints}
          question={props.question}
          progress={props.progress}
        />
        <GameBtnArena
          answers={props.answers}
          btnHandler={props.btnHandler}
          passedCode={props.passedCode}
        />
      </Flex>
    )
  }

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      w="100%"
      maxW={320}
    >
      {mode}
    </Flex>
  )
}

export default GameDisplay
