import { Flex, Box, Progress, Text } from '@chakra-ui/react'

import PeopleCatPhoto from '../../../assets/img/peopleCat2.jpg'

interface QuestionCardProps {
  question: string
  hints: string[]
  progress: number
}

const QuestionCard = (props: QuestionCardProps) => {
  return (
    <Box
      w="100%"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      borderColor="secondary.light"
      overflow="hidden"
      bg="rgba(255,255,255,0.55)"
    >
      <Box
        h={200}
        bgImage={PeopleCatPhoto}
        bgPosition="center"
        bgSize="cover"
        position="relative"
      >
        <Text
          w="100%"
          textAlign="center"
          fontSize={'1.25em'}
          fontWeight={500}
          color={'text.primary.650'}
          letterSpacing={1}
          bg="rgba(255,255,255,0.45)"
          position="absolute"
          bottom={0}
        >
          {props.question}
        </Text>
      </Box>
      <Progress value={props.progress} colorScheme="orange" />
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        p={1}
      >
        {props.hints.map((el, index) => {
          return (
            <Box
              key={index}
              m={1}
              p={1}
              w="90%"
              bg={'secondary.light'}
              opacity={0.9}
              borderRadius={10}
              color="text.primary.800"
              fontWeight="semibold"
              fontSize="xs"
              letterSpacing={1}
              // textTransform="uppercase"
              textAlign="center"
            >
              {el}
            </Box>
          )
        })}
      </Flex>
    </Box>
  )
}

export default QuestionCard
