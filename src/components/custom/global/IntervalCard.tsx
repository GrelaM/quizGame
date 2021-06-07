import { Flex, Progress, Text } from '@chakra-ui/react'

import PeopleCatPhoto from '../../../assets/img/questionSmall.png'

interface InvervalCardProps {
  progress: number
}

const IntervalCard = (props: InvervalCardProps) => {
  return (
    <Flex
      w="90%"
      h={260}
      maxW={280}
      borderWidth="2px"
      borderRadius="lg"
      borderColor="secondary.main"
      boxShadow="lg"
      overflow="hidden"
      bgImage={PeopleCatPhoto}
      bgPosition="top"
      bgSize="contain"
      direction="column-reverse"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Progress value={props.progress} colorScheme="orange" w="100%" />
      <Flex
        bg="rgba(0,0,0,0.45)"
        h="100%"
        w="100%"
        dir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text
          lineHeight={10}
          textAlign="center"
          fontSize={'1.25em'}
          fontWeight={500}
          letterSpacing={3}
          color={'text.secondary.800'}
        >
          Get ready...
        </Text>
      </Flex>
    </Flex>
  )
}

export default IntervalCard
