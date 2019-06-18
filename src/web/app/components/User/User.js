import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Appbar from '../Common/Appbar'
import Information from './Information'

const contentTop = '15vh'
const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    backgroundImage: `url(${require('../../../assets/william-iven-8515-unsplash.jpg')})`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    width: '100%'
  },
  content: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  preview: {
    background: theme.palette.primary.white,
    borderRadius: 5,
    minWidth: '70vw',
    minHeight: '50vh',
    padding: theme.spacing(18) * 2,
  },
  avatar: {
    marginTop: '2vh',
    width: '15vw',
    height: '26.25vh',
    borderRadius: '50%'
  },
  infoTitle: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.white,
    height: theme.spacing(6),
    borderRadius: 4
  },
  infoContent: {
    margin: theme.palette.unit * 2,
    fontSize: 18
  },
  tabs: {
    width: 480,
    background: theme.palette.primary.white,
    borderRadius: 5,
  },
  filter: {
    width: '70vw',
    background: theme.palette.primary.white,
    borderRadius: 5
  }
}))

const User = props => {
  const classes = useStyles()
  const [filter, setFilter] = useState(0)

  const handleTabsChanged = (event, filter) => {
    setFilter(filter)
  }
  return (
    <div className={classes.root}>
      <Appbar />
      <Box display='flex' height={contentTop} />
      <Box display='flex' width='100%' justifyContent='center' alignItems='center' flexDirection='column'>
        <Box diplay='flex'>
          <Information/>
        </Box>
      </Box>
    </div>
  )
}

export default User
