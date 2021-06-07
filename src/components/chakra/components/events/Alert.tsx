import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Flex
} from '@chakra-ui/react'
import { useEffect } from 'react'

interface AlertDisplayProps {
  type: 'info' | 'warning' | 'success' | 'error' | undefined
  title: string
  message: string
  alertHandler: () => void
}

const AlertDisplay = (props: AlertDisplayProps) => {
  useEffect(() => {
    const close = setTimeout(() => {
      props.alertHandler()
    }, 3500)

    return () => {
      clearTimeout(close)
    }
  }, [props])

  return (
    <Alert
      status={props.type}
      position="absolute"
      bottom={3}
      w={300}
      variant="left-accent"
    >
      <AlertIcon />
      <Flex flexDirection={'column'}>
        <AlertTitle mr={2}>{props.title}</AlertTitle>
        <AlertDescription paddingInline={4}>
          {props.message}
        </AlertDescription>
      </Flex>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={props.alertHandler}
      />
    </Alert>
  )
}

export default AlertDisplay
