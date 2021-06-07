import { Box } from '@chakra-ui/react'

import GameBtn from '../custom/button/GameBtn'

interface GameBtnAreaProps {
  answers: { code: number; value: string }[]
  passedCode: number
  btnHandler: ({code, value}: {code: number, value: string}) => void
}

const GameBtnLayout = (props: GameBtnAreaProps) => {
  return (
    <Box w="100%" maxW={320} paddingBlock={1}>
      {props.answers.map((el, index) => {
        return (
          <GameBtn
            key={index}
            name={el.value}
            code={el.code}
            passedCode={props.passedCode}
            btnHandler={props.btnHandler.bind(this, {code: el.code, value: el.value})}
          />
        )
      })}
    </Box>
  )
}

export default GameBtnLayout
