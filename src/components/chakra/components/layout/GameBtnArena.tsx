import { Box, Button } from '@chakra-ui/react'

interface GameBtnAreaProps {
  answers: { code: number; value: string }[]
  passedCode: number
  btnHandler: ({code, value}: {code: number, value: string}) => void
}

const GameBtnArena = (props: GameBtnAreaProps) => {
  return (
    <Box w="100%" maxW={320} paddingBlock={1}>
      {props.answers.map((el, index) => {
        return (
          <Button
            key={index}
            color="text.secondary.900"
            w="45%"
            m={2}
            paddingBlock={5}
            bg="primary.main"
            _hover={{
              bg: "primary.main"
            }}
            _focus={{
              outline: "none"
            }}
            isActive={props.passedCode === el.code ? true : false}
            _active={{
              bg: "secondary.main"
            }}
            onClick={props.btnHandler.bind(this, {code: el.code, value: el.value})}
          >
            {el.value}
          </Button>
        )
      })}
    </Box>
  )
}

export default GameBtnArena
