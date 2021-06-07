import { Box, Image, Progress, Text } from '@chakra-ui/react'

import PeopleCatPhoto from '../../../../assets/img/peopleCat2.jpg'

interface QuestionCardProps {
  question: string
  hints: string[]
  progress: number
}

const QuestionCard = (props: QuestionCardProps) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      borderColor="secondary.light"
      overflow="hidden"
      bg="rgba(255,255,255,0.55)"
    >
      <Image src={PeopleCatPhoto} alt={'peopleCategory'} />
      <Progress value={props.progress} colorScheme="orange" />
      <Box paddingBottom="2">
        <Box
          d="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text
            w="100%"
            textAlign="center"
            fontSize={'1.25em'}
            bg="rgba(0,0,0,0.1)"
            m={0}
            p={0}
          >
            {props.question}
          </Text>
          {props.hints.map((el, index) => {
            return (
              <Box
                key={index}
                m={1}
                w="100%"
                color="text.primary.700"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                textAlign="center"
              >
                {el}
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default QuestionCard
