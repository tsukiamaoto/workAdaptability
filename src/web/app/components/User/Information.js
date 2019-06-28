import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { FiUpload } from "react-icons/fi"
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'

const data = {
  name: '王大明',
  birth: '2000/1/1',
  address: '桃園市中壢區遠東路135號',
  education: '元智大學',
  phone: '0911111111',
  email: '1234@g.yzu.edu.tw'
}

const useStyles = makeStyles(theme => ({
  preview: {
    background: theme.palette.primary.white,
    borderRadius: 5,
    minWidth: '70vw',
    padding: theme.spacing(2),
  },
  information: {
    background: theme.palette.primary.white,
    marginLeft:  theme.spacing(15),
    borderRadius: 5,
  },
  avatar: {
    marginTop: '2vh',
    width: '15vw',
    height: '32.25vh',
    borderRadius: '50%'
  },
  infoTitle: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.white,
    height: theme.spacing(6),
    borderRadius: 4,
  },
  infoContent: {
    margin: theme.palette.unit * 2,
    fontSize: 18
  },
  button: {
    marginBottom: theme.spacing(5),
  }
}))

const Information = props => {
  const classes = useStyles()
  const user = data
  return(
    <div>
      <Box display='flex' >
        <Paper>
          <Box display='flex' width='100%' className={classes.infoTitle} alignItems='center' justifyContent='center'>
            個人資料
          </Box>
          <Box display='flex' className={classes.preview}>
            <Box width='5%'/>
            <Box display='flex' flexDirection='column' alignItems='center'>
              <img
                className={classes.avatar}
                src={require('../../../assets/freestocks-org-190062-unsplash.jpg')}
                alt='person'
              />
            </Box>
            <Box display='flex' minHeight='100%' flexDirection='column'>
              <Box className={classes.information} width='100%'>
                <Box mt={2}>
                  <Typography>
                    {`姓名:${user.name}`}
                  </Typography>
                </Box>
                <Box mt={2}>
                  <Typography className={classes.infoContent}>
                    {`生日:${user.birth}`}
                  </Typography>
                </Box>
                <Box mt={2}>
                  <Typography className={classes.infoContent}>
                    {`地址:${user.address}`}
                  </Typography>
                </Box>
                <Box mt={2}>
                  <Typography className={classes.infoContent}>
                    {`學歷:${user.education}`}
                  </Typography>
                </Box>
                <Box mt={2}>
                  <Typography className={classes.infoContent}>
                    {`Phone:${user.phone}`}
                  </Typography>
                </Box>
                <Box mt={2}>
                  <Typography>
                    {`Email:${user.email}`}
                  </Typography>
                </Box>
                <Box display='flex'  justifyContent='center'>

                </Box>
              </Box>
          </Box>
          </Box>
          <Box display='flex' className={classes.button} flexDirection>
            <Box ml='12%'>
              <Button variant="outlined" size="medium" color="primary">
                <FiUpload/>
                上傳圖片
              </Button>
            </Box>
            <Box ml='20%'>
              <Button variant="outlined" size="medium" color="primary">
                編輯個人資料
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  )
}

export default Information
