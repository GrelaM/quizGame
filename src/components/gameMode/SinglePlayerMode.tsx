import { makeStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import InputComponent from '../general/InputComponent'
import MainButton from '../general/MainButton'

interface SingePlayerProps {
  nicknameHandler: (value: string) => void
  nickname: boolean
  startGameHandler: () => void
  timerValue: string
  levelValue: string
  questionQuantity: string
  timeHandler: (event: string) => void
  levelHandler: (event: string) => void
  quantityHandler: (event: string) => void
  gameModeHandler: () => void
}

const settings = {
  description: ['Number of questions', 'Time', 'Level'],
  label: ['quantity', 'timer', 'level'],
  options: [
    ['5', '10', '15'],
    ['9', '15', '21'],
    ['EASY', 'MEDIUM', 'HARD']
  ],
  quantity: ['5', '10', '15'],
  timer: ['9', '15', '21'],
  levels: ['EASY', 'MEDIUM', 'HARD']
}

const SinglePlayerMode = (props: SingePlayerProps) => {
  const classes = useStyles()
  const display = {
    handlers: [props.quantityHandler, props.timeHandler, props.levelHandler],
    passedProps: [props.questionQuantity, props.timerValue, props.levelValue]
  }

  return (
    <div className={classes.root}>
      <InputComponent 
        label={'Enter Your Nickname...'}
        type={'string'}
        onInputChange={props.nicknameHandler} 
      />
      <div className={classes.controlField}>
        {display.handlers.map((el, index: number) => {
          return (
            <FormControl className={classes.controlForm} key={index}>
              <FormLabel component="legend" className={classes.controlLabel}>
                {settings.description[index]}
              </FormLabel>
              <RadioGroup
                className={classes.groupLayout}
                row
                aria-label={settings.label[index]}
                name={settings.label[index]}
                value={display.passedProps[index]}
                onChange={(event) => el(event.target.value)}
              >
                {settings.options[index].map((el, index) => {
                  return (
                    <FormControlLabel
                      value={el}
                      control={<Radio />}
                      label={el}
                      key={index}
                    />
                  )
                })}
              </RadioGroup>
            </FormControl>
          )
        })}
      </div>
      <MainButton
        notActive={!props.nickname ? true : false}
        mainBtnName={'Start Game'}
        onBtnClick={props.startGameHandler}
      />
      <MainButton
        colorType={'secondary'}
        notActive={false}
        mainBtnName={'Back'}
        onBtnClick={props.gameModeHandler}
      />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexGrow: 1,
    paddingBlock: 5
  },
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

export default SinglePlayerMode
