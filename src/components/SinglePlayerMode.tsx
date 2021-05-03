import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import InputComponent from './InputComponent'
import MainButton from './MainButton'

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
  gameModeHandler: (mode: number) => void
}

const SinglePlayerMode = (props: SingePlayerProps) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <InputComponent onInputChange={props.nicknameHandler} />
      <div className={classes.controlField}>
        <FormControl className={classes.controlForm}>
          <FormLabel component="legend" className={classes.controlLabel}>
            Number of questions
          </FormLabel>
          <RadioGroup
            className={classes.groupLayout}
            row
            aria-label="quantity"
            name="quantity"
            value={props.questionQuantity}
            onChange={(event) => props.quantityHandler(event.target.value)}
          >
            <FormControlLabel value="5" control={<Radio />} label="5" />
            <FormControlLabel value="10" control={<Radio />} label="10" />
            <FormControlLabel value="15" control={<Radio />} label="15" />
          </RadioGroup>
        </FormControl>
        <FormControl  className={classes.controlForm}>
          <FormLabel component="legend" className={classes.controlLabel}>
            Time
          </FormLabel>
          <RadioGroup
            className={classes.groupLayout}
            row
            aria-label="timer"
            name="timer"
            value={props.timerValue}
            onChange={(event) => props.timeHandler(event.target.value)}
          >
            <FormControlLabel value="9" control={<Radio />} label="9" />
            <FormControlLabel value="15" control={<Radio />} label="15" />
            <FormControlLabel value="21" control={<Radio />} label="21" />
          </RadioGroup>
        </FormControl>
        <FormControl  className={classes.controlForm}>
          <FormLabel component="legend" className={classes.controlLabel}>
            Level
          </FormLabel>
          <RadioGroup
            className={classes.groupLayout}
            row
            aria-label="level"
            name="level"
            value={props.levelValue}
            onChange={(event) => props.levelHandler(event.target.value)}
          >
            <FormControlLabel value="EASY" control={<Radio />} label="EASY" />
            <FormControlLabel
              value="MEDIUM"
              control={<Radio />}
              label="MEDIUM"
            />
            <FormControlLabel value="HARD" control={<Radio />} label="HARD" />
          </RadioGroup>
        </FormControl>
      </div>
      <MainButton
        notActive={!props.nickname ? true : false}
        mainBtnName={'Start Game'}
        onBtnClick={props.startGameHandler}
      />
      <MainButton
        notActive={false}
        mainBtnName={'Back'}
        onBtnClick={props.gameModeHandler.bind(this, 0)}
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
    alignItems: 'center',
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
