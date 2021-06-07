import { Input } from '@chakra-ui/react'

interface TextInputProps {
    onChange: (event: string) => void
    value: string
    placeholder?: string
}

const TextInput = (props: TextInputProps) => {
    return(
        <Input
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        w={['90%', '80%']}
        m={2}
        textAlign="center"
        placeholder={props.placeholder ? props.placeholder : "enter yout nickname..."}
        _placeholder={{
          color: 'secondary.dark',
          letterSpacing: '1px',
          fontWeight: 'normal'
        }}
        size="lg"
        borderColor="secondary.light"
        focusBorderColor="secondary.dark"
        _hover={{
          borderColor: 'secondary.main'
        }}
        bg="rgba(255,255,255,0.15)"
        color="secondary.dark"
        letterSpacing={1.5}
        fontWeight="bold"
      />
    )
}

export default TextInput