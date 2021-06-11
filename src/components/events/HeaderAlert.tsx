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

const toggleAlertHandler = (setGlobalState: React.Dispatch<GlobalAction>) => {
  setGlobalState({ type: GlobalHandler.CLEAR_MENU_ALERT_HANDLER })
}

const HeaderAlertBox = () => {
  const [globalState, setGlobalState] = useGlobalState()

  useEffect(() => {
    if (!globalState.menu.toggleHeaderAlert.status) return () => {}
    const close = setTimeout(() => {
      toggleAlertHandler(setGlobalState)
    }, globalState.menu.toggleHeaderAlert.displayTimer)

    return () => {
      clearTimeout(close)
    }
  }, [
    globalState.menu.toggleHeaderAlert.status,
    globalState.menu.toggleHeaderAlert.displayTimer,
    setGlobalState
  ])

  return (
    <Alert
      display={globalState.menu.toggleHeaderAlert.status ? 'flex' : 'none'}
      status={globalState.menu.toggleHeaderAlert.type}
      w={'100%'}
      maxW={300}
      variant="top-accent"
      borderRadius={10}
      boxShadow="dark-lg"
    >
      <AlertIcon />
      <Flex flexDirection={'column'} textAlign={'left'}>
        <AlertTitle mr={2}>
          {globalState.menu.toggleHeaderAlert.title}
        </AlertTitle>
        <AlertDescription mr={2}>
          {globalState.menu.toggleHeaderAlert.message}
        </AlertDescription>
      </Flex>
      <CloseButton
        _hover={{
          background: 'rgba(0,0,0,0.15)'
        }}
        _active={{
          background: 'rgba(0,0,0,0.45)'
        }}
        _focus={{
          border: '1px solid',
          borderColor: 'rgba(0,0,0,0.25)'
        }}
        color="text.primary.500"
        position="absolute"
        right="8px"
        top="8px"
        onClick={() => toggleAlertHandler(setGlobalState)}
      />
    </Alert>
  )
}

export default HeaderAlertBox
