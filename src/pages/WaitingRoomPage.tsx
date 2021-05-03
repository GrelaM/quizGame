// import { useState } from 'react'
// import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    padding: 30
  }
}))

const WaitingRoomPage = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
        Will be ready soon...
    </div>
  )
}

export default WaitingRoomPage
