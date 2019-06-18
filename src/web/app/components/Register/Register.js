import React, { useState, useEffect } from 'react'
import { Link as Href } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import Appbar from '../Common/Appbar'
import Link from '@material-ui/core/Link'
import MomentUtils from '@date-io/moment'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

const contentTop = '15vh'
const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    paddingBottom: theme.spacing(3),
    backgroundImage: `url(${require('../../../assets/william-iven-8515-unsplash.jpg')})`,
    backgroundSize:'cover',
  },
  paper: {
    width: '80vw',
    marginLeft: '5vw',
    marginRight: '5vw',
    borderRadius: 6,
    paddingBottom: theme.spacing(6),
  },
  title: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.white,
    height: theme.spacing(6),
    borderRadius: 6,
  },
  content: {
    marginTop: theme.spacing(6)
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.primary.gray,
    padding: `0 ${ theme.spacing(2) }px`,
    width: '100%'
  },
  login: {
    fontSize: 20,
  },
  date: {
    width: '90%'
  },
  verification: {
    fontSize: 20,
  },
  ok: {
    fontSize: 18,
    width: '100%',
    height: '20%',
  }
}))

const Register = props => {
  const classes = useStyles()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [verifiedPassword, setVerifiedPassword] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [areaCode, setAreaCode] = useState('')
  const [telephone, setTelephone] = useState('')
  const [address, setAddress] = useState('')
  const [birth, setBirth] = useState(new Date())
  const [education, setEducation] = useState('')

  const handleAccountChange = event => { setAccount(event.target.value) }
  const handlePasswordChange = event => { setPassword(event.target.value) }
  const handleVerifiedPasswordChange = event => { setVerifiedPassword(event.target.value) }
  const handleEmailChange = event => { setEmail(event.target.value) }
  const handleNameChange = event => { setName(event.target.value) }
  const handlePhoneChange = event => { setPhone(event.target.value) }
  const handleAreaCodeChange = event => { setAreaCode(event.target.value) }
  const handleTelephoneChange = event => { setTelephone(event.target.value) }
  const handleAddressChange = event => { setAddress(event.target.value) }
  const handleBirthChange = event => { setBirth(event) }
  const handleEducationChange = event => { setEducation(event.target.value) }
  // const [{status, response}, makeRequest] = useRegisApi(
  //   { account, password, verifiedPassword, email, name, phone, areaCode, telephone, address, birth, education })

  return (
    <div className={classes.root}>
      <Appbar/>
      <Box display="flex" height={contentTop} />
      <Paper className={classes.paper}>
        <Box className={classes.title} display="flex" justifyContent="center" alignItems="center" width={1}>
          <Typography>加入會員</Typography>
        </Box>
        <Box className={classes.content} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <Box display="flex">
            <Box display="flex">
              <Typography color="secondary">*</Typography>
            </Box>
            <Box display="flex" mx={1}>
              <Typography>帳號：</Typography>
            </Box>
            <Box display="flex" mx={1}>
              <InputBase className={classes.input} onChange={handleAccountChange} />
            </Box>
            <Box display="flex" >
              <Typography>
                已有帳號?現在
                <Href to="/login">
                  <Link className={classes.login} component="button" variant="inherit" >登入</Link>
                </Href>
              </Typography>
            </Box>
          </Box>

          <Box display="flex" mt={3}>
            <Box display="flex">
              <Typography color="secondary">*</Typography>
            </Box>
            <Box display="flex" mx={1}>
              <Typography>密碼：</Typography>
            </Box>
            <Box display="flex" mx={1}>
              <InputBase className={classes.input} type="password" onChange={handlePasswordChange} />
            </Box>
            <Box display="flex" mx={11.5}/>
          </Box>

          <Box display="flex" mt={3}>
            <Box display="flex">
              <Typography color="secondary">*</Typography>
            </Box>
            <Box display="flex" mx={1}>
              <Typography>確認密碼：</Typography>
            </Box>
            <Box display="flex" mx={1}>
              <InputBase className={classes.input} type="password" onChange={handleVerifiedPasswordChange} />
            </Box>
            <Box display="flex" mx={14}/>
          </Box>

          <Box display="flex" mt={3}>
            <Box display="flex">
              <Typography color="secondary">*</Typography>
            </Box>
            <Box display="flex" mx={1}>
              <Typography>Email：</Typography>
            </Box>
            <Box display="flex" mx={1}>
              <InputBase className={classes.input} type="email" onChange={handleEmailChange} />
            </Box>
            <Box display="flex" mx={12.5}/>
          </Box>

          <Box display="flex" mt={3}>
            <Box display="flex">
              <Typography color="secondary">*</Typography>
            </Box>
            <Box display="flex" mx={1}>
              <Typography>真實姓名：</Typography>
            </Box>
            <Box display="flex" mx={1}>
              <InputBase className={classes.input} onChange={handleNameChange}/>
            </Box>
            <Box display="flex" mx={14.5}/>
          </Box>

          <Box display="flex" mt={1}>
            <Box display="flex" mt={4}>
              <Typography color="secondary">*</Typography>
            </Box>
            <Box display="flex" mx={1} mt={4}>
              <Typography>出生日期：</Typography>
            </Box>
            <Box display="flex" mx={1}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  className={classes.date}
                  margin="normal"
                  label="選擇日期"
                  value={birth}
                  onChange={handleBirthChange}
                />
              </MuiPickersUtilsProvider>
            </Box>
            <Box display="flex" mx={13}/>
          </Box>

          <Box display="flex" mt={3} flexDirection="column">
            <Box display="flex">
              <Box display="flex">
                <Typography color="secondary">*</Typography>
              </Box>
              <Box display="flex" mx={1}>
                <Typography>連絡電話：</Typography>
              </Box>
              <Box display="flex" mx={1}>
                <Typography>手機：</Typography>
              </Box>
              <Box display="flex" mx={1}>
                <InputBase className={classes.input} style={{width:"100%"}} onChange={handlePhoneChange} inputProps={{maxLength: 10}}/>
              </Box>
              <Box display="flex" mx={13.5}/>
            </Box>
            <Box display="flex" mt={3}>
              <Box mx={7.8}/>
              <Box display="flex">
                <Box display="flex" mx={1}>
                  <Typography>住家：</Typography>
                </Box>
                <Box display="flex" mx={1} style={{width: "8%"}}>
                  <InputBase className={classes.input} onChange={handleAreaCodeChange} inputProps={{maxLength: 2}}/>
                </Box>
                <Box display="flex" mx={1}>
                  <Typography>-</Typography>
                </Box>
                <Box display="flex" mx={1} style={{width: "27%"}}>
                  <InputBase className={classes.input} onChange={handleTelephoneChange} inputProps={{maxLength: 8}}/>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box display="flex" mt={3}>
            <Box display="flex">
              <Typography color="secondary">*</Typography>
            </Box>
            <Box display="flex" mx={1}>
              <Typography>聯絡地址：</Typography>
            </Box>
            <Box display="flex" mx={1}>
              <InputBase className={classes.input} onChange={handleAddressChange}/>
            </Box>
            <Box mx={15}/>
          </Box>

          <Box display="flex" mt={3}>
            <Box display="flex">
              <Typography color="secondary">*</Typography>
            </Box>
            <Box display="flex" mx={1}>
              <Typography>學歷：</Typography>
            </Box>
            <Box display="flex" mx={1}>
              <InputBase className={classes.input} onChange={handleEducationChange}/>
            </Box>
            <Box mx={12.5}/>
          </Box>

          <Box display="flex" mt={4}>
            <Button className={classes.ok} style={{color: 'white', background: '#3f51b5'}} >確認送出</Button>
          </Box>
        </Box>
      </Paper>
    </div>
  )
}

export default Register
