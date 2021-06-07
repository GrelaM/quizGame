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
  shouldDisplay: boolean
  type: 'info' | 'warning' | 'success' | 'error' | undefined
  title: string
  message: string
  alertHandler: () => void
  alertTimer?: number
}

const AlertBox = (props: AlertDisplayProps) => {
  useEffect(() => {
    const timer = props.alertTimer ? props.alertTimer : 3000
    if(!props.shouldDisplay) return () => {}
    const close = setTimeout(() => {
      props.alertHandler()
    }, timer)

    return () => {
      clearTimeout(close)
    }
  }, [props])

  return (
    <Flex
      display={props.shouldDisplay ? 'flex' : 'none'}
      bg={'rgba(0, 0, 0, 0.6)'}
      zIndex={1}
      position="absolute"
      top={0}
      w="100%"
      h="100%"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Alert
        status={props.type}
        w={'100%'}
        maxW={300}
        variant="solid"
        borderRadius={10}
        boxShadow="dark-lg"
      >
        <AlertIcon />
        <Flex flexDirection={'column'} textAlign={"left"}>
          <AlertTitle mr={2}>{props.title}</AlertTitle>
          <AlertDescription mr={2}>{props.message}</AlertDescription>
        </Flex>
        <CloseButton
          position="absolute"
          right="8px"
          top="8px"
          onClick={props.alertHandler}
        />
      </Alert>
    </Flex>
  )
}

export default AlertBox
