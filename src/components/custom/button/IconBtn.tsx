import { IconButton } from '@chakra-ui/react'

interface IconBtnProps {
  btnHandler: () => void
  icon: JSX.Element
  isDisabled: boolean
}

const IconBtn = (props: IconBtnProps) => {
  return (
    <IconButton
      disabled={props.isDisabled}
      m={1}
      bg="secondary.light"
      _hover={{
        background: 'secondary.main'
      }}
      _active={{
        background: 'secondary.dark'
      }}
      _focus={{
        border: 'none'
      }}
      color={'white'}
      aria-label="home"
      size="lg"
      icon={props.icon}
      onClick={props.btnHandler}
    />
  )
}

export default IconBtn
