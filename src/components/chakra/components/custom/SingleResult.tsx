import { Flex, Text } from '@chakra-ui/react'

interface SingleResultProps {
  name: string
  correctAnswers: number
  totalQuestions: number
  points: number
  bg?: 'host'
}

const SingleResult = (props: SingleResultProps) => {
  return (
    <Flex
      marginBlock={2}
      w="85%"
      justifyContent="space-between"
      fontWeight="600"
      color={"text.primary.800"}
      bg={props.bg === 'host' ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.55)"}
      paddingBlock={1}
      paddingInline={2}
      borderRadius={8}
    >
      <Text w={'35%'} textAlign="left" color={"text.primary.700"}>
        {props.name}
      </Text>
      <Flex fontWeight="700">
        <Text marginRight={1} color={"success"}>{props.correctAnswers}</Text>
        <Text>/ {props.totalQuestions}</Text>
      </Flex>
      <Flex w={'35%'}>
        <Text marginRight={1} w={'40%'} color={"success"} fontWeight="700">
          {props.points}
        </Text>
        <Text>points</Text>
      </Flex>
    </Flex>
  )
}

export default SingleResult
