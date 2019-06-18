import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { AppBar } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Popover from '@material-ui/core/Popover'
import { useTranslation } from 'react-i18next'
import { FiSearch, FiUser } from 'react-icons/fi'
import Language from './Language'
import _ from 'lodash'

const useStyles = makeStyles(theme => ({
  appbar: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.white
  },
  appbarFont: {
    color: theme.palette.primary.white,
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 600,
  },
  list: {
    width: theme.spacing(18),
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
  },
  input: {
    marginLeft: theme.spacing(),
    flex: 1,
  },
  iconSearch: {
    padding: theme.spacing(),
  },
  iconPerson: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.white,
    width: 25,
    height: 25
  },
  media: {
    background: theme.palette.primary.white,
    height: theme.spacing(5),
    width: theme.spacing(5),
  },
  link: {
    textDecoration: 'none'
  }
}))

const Appbar = props => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(0)
  const [search, setSearch] = useState('')
  const open = Boolean(anchorEl)
  const { t } = useTranslation()

  const handleSearchChanged = event => {
    setSearch(event.target.value)
  }
  const makeSearchRequest = (value) => {

  }
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(0)
  }

  return (
    <AppBar>
      <Box className={classes.appbar} width='101%' display='flex' alignItems='center' justifyContent='flex-end'>
        <Box display='flex' mx={5}>
          <Button>
            <Link className={classes.link} to='/'>
              <Typography className={classes.appbarFont}>{t('回到首頁')}</Typography>
            </Link>
          </Button>
        </Box>
        <Box display='flex' flexGrow={1} mx={4} m={1}>
          <Paper className={classes.search}>
            <InputBase className={classes.input} placeholder='Search...' onChange={handleSearchChanged}/>
            <IconButton className={classes.iconSearch} onClick={makeSearchRequest(search)}>
              <FiSearch icon='search' />
            </IconButton>
          </Paper>
        </Box>
        <Box display='flex' mx={1} >
          <Language/>
        </Box>
        <Box className={classes.appbarFont} display='flex' mx={1}>
          <Link className={classes.link} to='/resume'>
            <Button>
              <Typography className={classes.appbarFont}>{t('履歷介面')}</Typography>
            </Button>
          </Link>
        </Box>
        <Box display='flex' mx={1}  >
          <Button onClick={handleClick}>
            <FiUser className={classes.iconPerson}/>
            <Typography className={classes.appbarFont} >{t('帳戶資訊')}</Typography>
          </Button>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
              <Box display='flex'>
                <Link className={classes.link} to='/login'>
                  <Button className={classes.list}>{t('登入')}</Button>
                </Link>
              </Box>
              <Box display='flex'>
                <Link className={classes.link} to='/register'>
                  <Button className={classes.list}>{t('註冊')}</Button>
                </Link>
              </Box>
              <Box display='flex'>
                <Link className={classes.link} to='/information'>
                  <Button className={classes.list}>
                    {t('個人資訊')}
                  </Button>
                </Link>
              </Box>
            </Box>
          </Popover>
        </Box>
        <Box display='flex' mx={4} />
      </Box>
    </AppBar>
  )
}

export default Appbar
