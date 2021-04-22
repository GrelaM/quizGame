import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import  {mainLinearGradient} from '../constants/main-theme-provider'
import {useGameState} from '../providers/GameStateProvider'

const useStyles = makeStyles((theme) => ({
  root: {
    background: mainLinearGradient,
    border: 0,
    boxShadow: '0 3px 5px 2px rgba(236, 0, 39, 0.2)',
    color: theme.palette.text.secondary
  }
}))

const StartPage = () => {
  const classes = useStyles()
  const [state] = useGameState()

  return (
    <Container className={classes.root}>
      <h1>{state.header}</h1>
    </Container>
  )
}

export default StartPage
