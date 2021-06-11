import { Flex, Text, useMediaQuery, Collapse } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { useGlobalState } from '../../../providers/StateProvider'

import HeaderAlert from '../../events/HeaderAlert'
import MenuBtnLayout from '../../layout/MenuBtnLayout'

const Header = () => {
  const [isLargerThen720] = useMediaQuery('(min-width: 720px)')
  const history = useHistory()
  const [state] = useGlobalState()

  const activeHandler = (
    btnState: boolean,
    type: 'full' | 'partial'
  ): boolean => {
    let state: boolean = false

    const pathname: boolean = window.location.pathname === '/' ? true : false
    const historyCheck: boolean = history.action === 'POP' ? true : false
    const stateCheck: boolean = btnState ? false : true

    if (type === 'full') {
      state = (pathname && stateCheck) || historyCheck
    } else if (type === 'partial') {
      state = pathname && stateCheck
    }
    return state
  }

  return (
    <Flex w="100%" zIndex={200} direction="column" boxShadow="lg" mb={4}>
      <Flex
        w="inherit"
        p={4}
        bg="primary.gradient"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        h={20}
      >
        <Text
          color="white"
          fontSize={isLargerThen720 ? '4vw' : '5vw'}
          textTransform={'uppercase'}
          w="100%"
          textAlign={isLargerThen720 ? 'center' : 'left'}
        >
          {state.menu.header}
        </Text>
        <MenuBtnLayout
          backBtn={{
            handler: () => history.goBack(),
            isDisabled: activeHandler(state.menu.activeBtnState, 'full')
          }}
          homeBtn={{
            handler: () => history.push('/'),
            isDisabled: activeHandler(state.menu.activeBtnState, 'partial')
          }}
        />
      </Flex>
      <Collapse in={state.menu.toggleHeaderAlert.status} animateOpacity>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          top={20}
          w="100%"
          bg={'rgba(255, 255, 255, 0.25)'}
          paddingBlock={3}
        >
          <HeaderAlert />
        </Flex>
      </Collapse>
    </Flex>
  )
}

export default Header
