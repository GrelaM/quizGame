import { Input } from '@chakra-ui/react'

interface TextInputProps {
    onChange: (event: string) => void
    value: string
    maxLength: number
    placeholder: string
    isDisabled: boolean
}

const CustomInput = (props: TextInputProps) => {
    return(
        <Input
        disabled={props.isDisabled}
        _disabled={{
          borderColor: 'secondary.light',
          bg: 'rgba(0,0,0,0.1)'
        }}
        maxLength={props.maxLength}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        w={'100%'}
        maxW={280}
        m={2}
        textAlign="center"
        placeholder={!props.isDisabled ? props.placeholder : 'Input is disabled...'}
        _placeholder={{
          color: !props.isDisabled ? 'secondary.dark' : 'text.primary.200',
          letterSpacing: '1px',
          fontWeight: 'normal'
        }}
        size="lg"
        borderColor="secondary.light"
        focusBorderColor="secondary.dark"
        _hover={{
          borderColor: 'secondary.main'
        }}
        bg="rgba(255,255,255,0.2)"
        color="secondary.dark"
        letterSpacing={1.5}
        fontWeight="bold"
        variant="flushed"
      />
    )
}

export default CustomInput