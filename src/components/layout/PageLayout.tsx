import { Flex } from '@chakra-ui/react'

import { useGameState } from '../../providers/GlobalStateProvider'

import HeaderBar from '../../components/custom/global/Header'
import CriticalAlertBox from '../events/CriticalAlertBox'

interface PageLayoutProps {
  children: React.ReactNode
  toggleAlert?: boolean
  alertHandler?: () => void
  alertTimer?: number
}

const PageLayout = (props: PageLayoutProps) => {
  const state = useGameState()[0]

  return (
    <Flex
      flex={1}
      flexDirection="column"
      justifyContent="flex-start"
      align="center"
      w={'100%'}
    >
      <HeaderBar />
      <CriticalAlertBox
        shouldDisplay={props.toggleAlert ? props.toggleAlert : false}
        type={state.alert.type}
        title={state.alert.title}
        message={state.alert.message}
        alertHandler={
          props.alertHandler
            ? props.alertHandler
            : () => console.log('Create function...')
        }
        alertTimer={props.alertTimer}
      />
      {props.children}
    </Flex>
  )
}

export default PageLayout
