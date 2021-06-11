import { Flex, useMediaQuery } from '@chakra-ui/react'

import icon from '../../assets/icon/icons'
import IconBtn from '../custom/button/IconBtn'

interface MenuBtnProps {
  backBtn: {
    handler: () => void
    isDisabled: boolean
  }
  homeBtn: {
    handler: () => void
    isDisabled: boolean
  }
}

const MenuBtnLayout = (props: MenuBtnProps) => {
  const [isLargerThen720] = useMediaQuery('(min-width: 720px)')

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      position={isLargerThen720 ? 'absolute' : 'static'}
      right={isLargerThen720 ? 5 : 0}
    >
      <IconBtn
        icon={icon.goBack}
        btnHandler={props.backBtn.handler}
        isDisabled={props.backBtn.isDisabled}
      />
      <IconBtn
        icon={icon.home}
        btnHandler={props.homeBtn.handler}
        isDisabled={props.homeBtn.isDisabled}
      />
    </Flex>
  )
}

export default MenuBtnLayout
