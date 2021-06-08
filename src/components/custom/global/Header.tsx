import { Flex, Box, Text, useMediaQuery } from '@chakra-ui/react'

import { useHistory } from 'react-router-dom'
import { useGameState } from '../../../providers/GlobalStateProvider'
import icon from '../../../assets/icon/icons'

import IconBtn from '../button/IconBtn'

const Header = () => {
  const [isLargerThen720] = useMediaQuery('(min-width: 720px)')
  const pathname = window.location.pathname !== '/' ? false : true
  const history = useHistory()
  const [state] = useGameState()

  return (
    <Box
      mb={4}
      bg="primary.gradient"
      w="100%"
      p={4}
      boxShadow="lg"
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      zIndex={200}
    >
      <Text
        color="white"
        fontSize={isLargerThen720 ? '4vw' : '5vw'}
        textTransform={'uppercase'}
        w="100%"
        textAlign={isLargerThen720 ? 'center' : 'left'}
      >
        {state.header}
      </Text>
      <Flex
        justifyContent="center"
        alignItems="center"
        position={isLargerThen720 ? 'absolute' : 'static'}
        right={isLargerThen720 ? 5 : 0}
      >
        <IconBtn
          icon={icon.goBack}
          btnHandler={() => history.goBack()}
          isDisabled={pathname || history.action === 'POP'}
        />
        <IconBtn
          icon={icon.home}
          btnHandler={() => history.push('/')}
          isDisabled={pathname}
        />
      </Flex>
    </Box>
  )
}

export default Header
