import { makeStyles } from '@material-ui/core/styles'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
// import InputComponent from '../general/InputComponent'

interface GameSettingsProps {
  description: string
  label: string
  stateValue: number
  options: { key: number; value: number; label: string }[]
  settingsHandler: (event: any) => void
  custom: { type: string; state: boolean }
}

const GameSettings = (props: GameSettingsProps) => {
  const classes = useStyles()

  return (
    <div className={classes.controlField}>
      <FormControl className={classes.controlForm}>
        <FormLabel component="legend" className={classes.controlLabel}>
          {props.description}
        </FormLabel>
        <RadioGroup
          className={classes.groupLayout}
          row
          aria-label={props.label}
          name={props.label}
          value={props.stateValue}
          onChange={(event) => props.settingsHandler(event.target.value)}
        >
          {props.options.map((el, index) => {
            return (
              <FormControlLabel
                key={index}
                value={el.key}
                control={<Radio />}
                label={el.label}
              />
            )
          })}
        </RadioGroup>
      </FormControl>
      {/* {props.custom.type === 'quantity' && props.custom.state ? (
        <InputComponent
          label={'Enter custom time'}
          type={'number'}
          onInputChange={() => console.log('Anything...')}
        />
      ) : null} */}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  controlForm: {
    marginBlock: 4,
    color: theme.palette.text.primary,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  groupLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  controlLabel: {
    color: theme.palette.success.main,
    width: '240px',
    borderBottom: `2px solid white`,
    paddingBottom: 5,
    fontWeight: 'bold',
    letterSpacing: 2,
    '&.MuiFormLabel-root.Mui-focused': {
      color: theme.palette.success.main,
      borderBottomColor: `${theme.palette.primary.main}`
    }
  },
  controlField: {
    paddingBlock: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

export default GameSettings
