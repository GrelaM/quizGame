import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Flex
} from '@chakra-ui/react'
import { useEffect } from 'react'

import { useGlobalState } from '../../providers/StateProvider'
import { GlobalHandler } from '../../constants/interface/provider/globalHandler'
import { GlobalAction } from '../../constants/interface/provider/globalAction'

const alertHandler = (setGlobalState: React.Dispatch<GlobalAction>) => {
  setGlobalState({ type: GlobalHandler.CLEAR_ALERT_HANDLER })
}

const AlertBox = () => {
  const [globalState, setGlobalState] = useGlobalState()

  useEffect(() => {
    if (!globalState.alert.status) return () => {}
    const close = setTimeout(() => {
      alertHandler(setGlobalState)
    }, globalState.alert.displayTimer)

    return () => {
      clearTimeout(close)
    }
  }, [globalState.alert.status, globalState.alert.displayTimer, setGlobalState])

  return (
    <Flex
      display={globalState.alert.status ? 'flex' : 'none'}
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
        status={globalState.alert.type}
        w={'100%'}
        maxW={300}
        variant="solid"
        borderRadius={10}
        boxShadow="dark-lg"
      >
        <AlertIcon />
        <Flex flexDirection={'column'} textAlign={'left'}>
          <AlertTitle mr={2}>{globalState.alert.title}</AlertTitle>
          <AlertDescription mr={2}>{globalState.alert.message}</AlertDescription>
        </Flex>
        <CloseButton
          position="absolute"
          right="8px"
          top="8px"
          onClick={() => alertHandler(setGlobalState)}
        />
      </Alert>
    </Flex>
  )
}

export default AlertBox
