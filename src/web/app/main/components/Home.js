import React from  'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import { AppBar } from '@material-ui/core'
import Table from './table'

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    marginTop: 20,
    backgroundColor: theme.palette.background.paper
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 600,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}))

function Home() {
  const classes= useStyles()
  const [value, setValue] = React.useState(0)

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar>

      </AppBar>
      <Grid container alignItems="center">
        <Grid item xs={1}>
          <img
              src={require('../../../assets/administrator-male.png')}
              alt="users"
              width='100'
              height='100'
            />
        </Grid>
        <Grid item xs>
          <Paper className={classes.search}>
            <InputBase className={classes.input} placeholder="Search" />
            <IconButton className={classes.iconButton}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>

      <Paper>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="最受歡迎" />
          <Tab label="薪資最高" />
          <Tab label="工時最短" />
          <Tab label="最適合你" />
        </Tabs>
        {/* <Table /> */}
      </Paper>
    </div>
  )
}

export default Home;
