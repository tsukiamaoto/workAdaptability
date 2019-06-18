import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Appbar from '../Common/Appbar'
import ReactHighcharts from 'react-highcharts'
import HighchartsMore from 'highcharts-more'
import { FiMail, FiPhone} from 'react-icons/fi'
import License from './License'
import Autobiography from './Autobiography'
import { connect } from 'react-redux'

HighchartsMore(ReactHighcharts.Highcharts)

const contentTop = '8vh'

var config = {
  chart: {
    polar: true,
    type: 'line'
  },
  title: {
    text: ''
  },
  xAxis: {
    categories: ['研究型(I)','藝術型(A)','社會型(S)','企業型(E)','事務型(C)','實用型(R)'],
    tickmarkPlacement: 'on',
    lineWidth: 0
  },
  series: [{
    data: [12, 13, 19, 17, 15, 24]
  }]
}

const useStyles = makeStyles( theme=>({
  root: {
    flex: 1,
    paddingBottom: theme.spacing(3),
    backgroundImage: `url(${require('../../../assets/william-iven-8515-unsplash.jpg')})`,
    backgroundSize:'cover',
  },
  person: {
    marginTop: theme.spacing(3),
  },
  intro: {
    width: '40%',
    padding: theme.spacing(3),
    background: theme.palette.primary.white,
    opacity: 0.95
  },
  icons: {
    color: theme.palette.primary.main
  },
  user: {
    fontSize: 50,
    fontWeight: 'bold',
    color: theme.palette.primary.main
  },
  abilityText: {
    fontWeight: 'bold',
    color: theme.palette.primary.main
  },
  ability: {
    width: '80%',
  },
  autobiography: {
    width: '45vw',
    borderColor: '#0288d1',
    paddingLeft: '1vw',
    paddingRight: '1vw',
    borderStyle: 'solid',
    borderTopStyle: 'hidden',
    borderBottomStyle: 'hidden',
    borderWidth: 3,
    background: theme.palette.primary.white,
    opacity: 0.9
  },


}))

const Resume = props => {
  const classes = useStyles()
  const { loading, error, payload, loadResume } = props

  useEffect(() =>{
    loadResume()
  },[])
  if(loading)
    return(<span>Loading...</span>)
  else if(error)
    return(<span>Error:{error}</span>)
  else {
    return (
      <div className={classes.root}>
        <Appbar />
        <Box display="flex" height={contentTop}/>
        <Box display="flex">
          <Box display="flex" className={classes.intro} flexDirection='column' >
            <Box display="flex" className={classes.person}  width='100%' justifyContent="center">
              <img
                src={require('../../../assets/person.svg')}
                alt="person"
                width='200'
                height='150'
              />
            </Box>

            <Box display="flex" mt={1} justifyContent="center">
              <Typography className={classes.user} style={{fontSize: '3rem'}}>
                使用者
              </Typography>
            </Box>

            <Box className={classes.ability} display="flex" width= '100%' flexDirection="column">
              <Box  display="flex" mx={2}/>
              <Typography className={classes.abilityText}>
                能力取向:
              </Typography>
              <ReactHighcharts
                config={config}
              />
            </Box>

            <Box display="flex" className={classes.icons} mt={4} flexDirection='column'>

              <Box display="flex" alignItems='center'>
                <Box display="flex">
                  <IconButton><FiMail/></IconButton>
                </Box>
                <Box display="flex">
                  <Typography>Email</Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems='center'>
                <Box display="flex">
                  <IconButton><FiPhone/></IconButton>
                </Box>
                <Box display="flex">
                  <Typography>Phone</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box display="flex" className={classes.autobiography} >
            <Autobiography/>
          </Box>
          <License/>
        </Box>

      </div>
    )
  }
}


// export default connect(
//   (state, props) => ({
//     loading: state.resume.loading,
//     error: state.resume.error,
//     payload: state.resume.payload
//   }),
//   (dispatch) => ({
//     loadResume: () => dispatch(actions.fetchResume()),
//   })
// )(Resume)
export default Resume
