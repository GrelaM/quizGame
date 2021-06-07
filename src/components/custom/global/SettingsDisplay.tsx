import { Flex, Center, Text, Radio, RadioGroup, Stack } from '@chakra-ui/react'

interface SettingsProps {
  description: string
  stateValue: number
  options: { key: number; value: number; label: string }[]
  settingsHandler: (event: any) => void
}

const Settings = (props: SettingsProps) => {
  return (
    <Flex
      flexDirection="column"
      marginBlock={2}
      minW={280}
      p={3}
      bg="rgba(0,0,0,0.15)"
      borderRadius={10}
      boxShadow="lg"
    >
      <Text
        mb={4}
        color="primary.dark"
        fontWeight="bold"
        letterSpacing={1}
        textAlign="center"
      >
        {props.description}
      </Text>
      <Center>
        <RadioGroup
          onChange={(event) => props.settingsHandler(event)}
          value={props.stateValue}
        >
          <Stack direction="row">
            {props.options.map((el, index) => {
              return (
                <Radio
                  key={index}
                  value={el.key}
                  _checked={{
                    bg: 'secondary.main',
                    color: 'white',
                    borderColor: 'secondary.dark'
                  }}
                  _focus={{
                    borderColor: 'secondary.dark'
                  }}
                  marginInline={2}
                >
                  <Text color="text.primary.700">{el.label}</Text>
                </Radio>
              )
            })}
          </Stack>
        </RadioGroup>
      </Center>
    </Flex>
  )
}

export default Settings
