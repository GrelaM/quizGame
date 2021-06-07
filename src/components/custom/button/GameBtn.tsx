import { Button } from '@chakra-ui/react'

interface GameBtnProps {
  name: string
  passedCode: number
  code: number
  btnHandler: () => void
}

const GameBtn = (props: GameBtnProps) => {
  return (
    <Button
      color="text.secondary.900"
      w="45%"
      m={2}
      paddingBlock={5}
      bg="primary.main"
      _hover={{
        bg: 'primary.main'
      }}
      _focus={{
        outline: 'none'
      }}
      isActive={props.passedCode === props.code ? true : false}
      _active={{
        bg: 'secondary.main'
      }}
      onClick={props.btnHandler}
    >
      {props.name}
    </Button>
  )
}

export default GameBtn
