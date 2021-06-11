import { Flex } from '@chakra-ui/react'

import HeaderBar from '../../components/custom/global/Header'
import CriticalAlertBox from '../events/CriticalAlertBox'

interface PageLayoutProps {
  children: React.ReactNode
}

const PageLayout = (props: PageLayoutProps) => {
  return (
    <Flex
      flex={1}
      flexDirection="column"
      justifyContent="flex-start"
      align="center"
      w={'100%'}
    >
      <HeaderBar />
      <CriticalAlertBox />
      {props.children}
    </Flex>
  )
}

export default PageLayout
