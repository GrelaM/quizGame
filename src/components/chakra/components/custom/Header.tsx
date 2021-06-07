import { Box, Text, IconButton, useMediaQuery } from '@chakra-ui/react'
import SvgIcon from '@material-ui/core/SvgIcon'

import { useGameState } from '../../../../providers/GameStateProvider'
import { useHistory } from 'react-router-dom'

const HomeIcon = () => {
  return (
    <SvgIcon>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  )
}

const Header = () => {
  const [isLargerThen720] = useMediaQuery("(min-width: 720px)")
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
        fontSize="2em"
        textTransform={'uppercase'}
        w="100%"
        textAlign={isLargerThen720 ? "center" : "left"}
      >
        {state.header}
      </Text>
      <IconButton
        position={isLargerThen720 ? "absolute" : "static"}
        right={isLargerThen720 ? 5 : 0}
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
        icon={<HomeIcon />}
        onClick={() => history.push('/')}
      />
    </Box>
  )
}

export default Header
