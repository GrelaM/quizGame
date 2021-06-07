import { useRef } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react'

interface AlertDialogComponentProps {
  isOpen: boolean
  onClose: () => void
  agree: () => void
  disagree: () => void
}

const AlertDialogComponent = (props: AlertDialogComponentProps) => {
  const cancelRef = useRef()

  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={cancelRef.current}
      onClose={() => {}}
    >
      <AlertDialogOverlay>
        <AlertDialogContent
          marginInline={1}
          bg="linear-gradient(160deg,#ffffff 25%, #ff9e00 95%)"
          boxShadow="dark-lg"
        >
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
            color="primary.dark"
          >
            Recovery of last game
          </AlertDialogHeader>
          <AlertDialogBody>
            We detected some credentials connected with your last game. Do you
            want to recover and continue your last game?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              bg="primary.dark"
              color="text.secondary.900"
              ref={cancelRef.current}
              onClick={props.agree}
              _focus={{
                border: 'none'
              }}
              _hover={{
                bg: "primary.main"
              }}
              boxShadow="md"
            >
              Recover
            </Button>
            <Button colorScheme="red" onClick={props.disagree} ml={3} boxShadow="md">
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default AlertDialogComponent
