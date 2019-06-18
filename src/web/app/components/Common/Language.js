import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'

const useStyles = makeStyles(theme =>({
  language: {
    color: theme.palette.primary.white,
  },
  list: {
    width: theme.spacing(14),
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
  }
}))

const Language = props => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(0)
  const open = Boolean(anchorEl)
  const { i18n } = useTranslation()
  const languageOptions = [
    { label: 'English', value: 'en-US' },
    { label: '中文(繁體)', value: 'zh-TW' },
    { label: '中文(简体)', value: 'zh-CN' }
  ]
  const language = i18n.language && languageOptions.find(languageOption => languageOption.value === i18n.language).label

  const handleLanguageSelect = (event, value, i18n) => {
    i18n.changeLanguage(value)
    setAnchorEl(0)
  }
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(0)
  }

  return (
    <div>
      <Button onClick={handleClick}>
        <Typography className={classes.language}>{language}</Typography>
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
        <Box display='flex' flexDirection='column'>
          {_.map(languageOptions, languageOption => {
            return(
              <Button className={classes.list} onClick={event => handleLanguageSelect(event, languageOption.value, i18n)}>{languageOption.label}</Button>
            )
          })}
        </Box>
      </Popover>
    </div>
  )
}

export default Language
