import React, {useState} from 'react'
import { makeStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'

const useStyles = makeStyles(theme => ({
  list:{
    width: '150%'
  },
  listItem: {
    paddingBottom: theme.spacing(4)
  },
  listItemText:{
    color: theme.palette.primary.main
  }
}))

const ListJobs = props => {
  const classes= useStyles()
  const {recommends,title} = props
  const [open, setOpen] = useState(Boolean(props.switch));

  function handleClick () {
    setOpen(!open);
  }

  return(
    <Paper className={classes.list}>
      <List component="nav" aria-label="recommend_jobs">
        <ListItem className={classes.listItem} button onClick={handleClick} >
          <ListItemText primary={title} textColor='primary'/>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {recommends && recommends.length && recommends.map((recommend,index) => (
            <ListItem className={classes.listItem} key={index}>
              <ListItemText secondary={recommend} key={index} />
            </ListItem>
          ))}
        </Collapse>
      </List>
    </Paper>
  )
}

export default ListJobs
