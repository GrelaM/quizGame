import { makeStyles } from '@material-ui/core/styles'

interface AuxProps  { 
    children: React.ReactNode
}

const ModeComponent = (props: AuxProps) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>{props.children}</div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexGrow: 1,
    paddingBlock: 15
  }
}))

export default ModeComponent
