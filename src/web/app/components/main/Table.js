import React, { useContext } from  'react'
import { makeStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import _ from 'lodash'

const useStyles = makeStyles(theme => ({
  table: {
    width: '70vw',
  },
  content:{
    marginLeft: theme.spacing(),
  },
  media: {
    height: theme.spacing(15),
    width: theme.spacing(20),
    borderRadius: 5,
  },
  item: {
    '&:hover': {
      background: theme.palette.hoverItem
    },
    padding: theme.spacing(3)
  },
  title:{
    fontSize: 26,
    color: theme.palette.primary.main
  },
  subtitle:{
    marginTop: theme.spacing(),
    fontSize: 18,
    color: theme.palette.primary.gray
  },
  company:{
    marginTop: theme.spacing(),
    color: theme.palette.primary.main
  },
  condition:{
    marginTop: theme.spacing(),
  },
  jobcontent:{
    marginTop: theme.spacing(),
    fontSize: 18,
    color: theme.palette.primary.gray
  },
  salary:{
    color: theme.palette.primary.orange
  },
  link: {
    textDecoration: 'none'
  }
}))

export default props => {
  const classes = useStyles()
  const { jobs } = props
  return(
    <div className={classes.table}>
      <Paper className={classes.paper}>
        {_.map(jobs, (job) => (
            <Box display='flex' flexDirection='row' className={classes.item}>
              <Box display='flex' width='20%' alignItems='center' justifyContent='center'>
                <img
                  className={classes.media}
                  src={job.image}
                  alt='image'
                />
              </Box>
              <Box className={classes.context} width='100%' display='flex' flexDirection='column'>
                <Link className={classes.link} href={job.link}>
                  <Typography className={classes.title}>
                    {job.title}
                  </Typography>
                </Link>
                <Typography className={classes.subtitle}>
                  <Box className={classes.company} dispaly='flex' >
                    {job.company}|{job.type}
                  </Box>
                  <Box className={classes.condition} display='flex' flexDirection='row'>
                    <Box className={classes.salary} display='flex' color='primary'>
                      {job.salary}
                    </Box>
                    <Box display='flex'>
                      |{job.experience}|{job.education}
                    </Box>
                  </Box>
                </Typography>
                <Typography className={classes.jobcontent} >
                  {(job.jobcontent.length < 145)? job.jobcontent: `${job.jobcontent.slice(0,145)}...`}
                </Typography>
              </Box>
            </Box>
        ))
      }
      </Paper>
    </div>
  )
}
