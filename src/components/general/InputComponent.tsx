import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    letterSpacing: '1px'
  },
  disabled: {},
  notchedOutline: {
    borderColor: theme.palette.secondary.dark
  },
  inputLabelProps: {
    color: theme.palette.success.main,
    fontWeight: 'bold'
  }
}))

interface inputComponentProps {
  onInputChange: (event: string) => void
  type: string
  label: string
}

const InputComponent = (props: inputComponentProps) => {
  const classes = useStyles()

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        type={props.type}
        variant="outlined"
        label={props.label}
        InputProps={{
          classes: {
            root: classes.root,
            disabled: classes.disabled,
            notchedOutline: classes.notchedOutline
          }
        }}
        InputLabelProps={{ classes: { root: classes.inputLabelProps } }}
        onChange={e => props.onInputChange(e.target.value)}
      />
    </form>
  )
}

export default InputComponent