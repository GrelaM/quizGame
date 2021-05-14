import { makeStyles } from '@material-ui/core/styles'

const JoinPage = () => {
  const classes = useStyles()


  return (
    <div className={classes.root}>
      <h1>I will be host page soon...</h1>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    padding: 10
  }
}))

export default JoinPage
