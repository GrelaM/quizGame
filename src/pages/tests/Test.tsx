import { Button } from '@chakra-ui/react'

import PageLayout from '../../components/layout/PageLayout'
import { useGlobalState } from '../../providers/StateProvider'
import { GlobalHandler } from '../../constants/interface/provider/globalHandler'

const Test = () => {
  const setGlobalState = useGlobalState()[1]

  return (
    <PageLayout>
      <Button
        onClick={() =>
          setGlobalState({
            type: GlobalHandler.MENU_ALERT_HANDLER,
            value: {
              type: 'success',
              title: 'Update',
              message: 'We have a new player...',
              status: true,
              displayTimer: 3500
            }
          })
        }
      >
        Open
      </Button>
      <h1>A</h1>
      <Button
        onClick={() =>
          setGlobalState({
            type: GlobalHandler.ALERT_HANDLER,
            value: {
              type: 'error',
              title: 'Update',
              message: 'We have a new player...',
              status: true,
              displayTimer: 3500
            }
          })
        }
      >
        Critical
      </Button>
    </PageLayout>
  )
}

export default Test
