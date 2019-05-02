import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'

const drawerWidth = 240;

const useStyles = makeStyles( theme=>({
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  person: {
    marginTop: 20,
  },
  icons: {
    marginBottom: 100,
  }
}))

function Resume () {
  const classes = useStyles()
  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes = {{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <Grid container>
          <Grid className={classes.person} item xs={12} justify="center" alignItems="center" >
            <img
              src={require('../../../assets/person.svg')}
              alt="person"
              width='200'
              height='150'
            />
          </Grid>

          <Grid item xs={12}>
            <Typography color="primary">
              使用者
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography color="primary">
              自我介紹:
            </Typography>
          </Grid>
        </Grid>

        <Grid container className={classes.icons}>
          <IconButton>
            <Icon classesName={classes.icon} color="primary">add_circle</Icon>
          </IconButton>
          <IconButton>
          </IconButton>
          <IconButton>
          </IconButton>
        </Grid>
      </Drawer>
    </div>
  )
}

export default Resume
