import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  message: {
    color: 'red',
    font: 14
  }
}))

const Message = (props) => {
  const classes = useStyles()
  const {msg} = props
  return(
    <div className={classes.message}>
      {msg}
    </div>
  )
}

export default Message
