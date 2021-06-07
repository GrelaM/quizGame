import { Button } from '@chakra-ui/react'

interface MainButtonProps {
  clickHandler: () => void
  name: string
  type: 'main' | 'aux'
  margin: 'small' | 'normal'
  disabled?: boolean
}

const Btn = (props: MainButtonProps) => {
  return (
    <Button
      disabled={props.disabled}
      marginBlock={props.margin !== 'small' ? 4 : 1}
      w={'100%'}
      maxW={280}
      fontSize={['md', 'xl']}
      paddingBlock={6}
      bg={props.type === 'main' ? 'primary.main' : 'secondary.main'}
      color="text.secondary.900"
      letterSpacing={1}
      textTransform="uppercase"
      boxShadow="md"
      _hover={{
        background: props.type === 'main' ? 'primary.light' : 'secondary.light',
        color: 'text.primary.400',
        boxShadow: "lg"
      }}
      _active={{
        background: props.type === 'main' ? 'primary.dark' : 'secondary.dark',
        color: 'text.secondary.900'
      }}
      _focus={{
        border: '2px solid',
        borderColor: props.type === 'main' ? 'primary.dark' : 'secondary.dark'
      }}
      _disabled={{
        background: props.type === 'main' ? 'primary.light' : 'secondary.light',
        color: 'text.primary.400'
      }}
      onClick={props.clickHandler}
    >
      {props.name}
    </Button>
  )
}

export default Btn
