import React, { useState, useEffect } from  'react'
import { makeStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import * as actions from '../../actions'
import Appbar from '../Common/Appbar'
import Table from './Table'
import Pagination from 'material-ui-flat-pagination'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

const contentTop = 85
const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    backgroundImage: `url(${require('../../../assets/william-iven-8515-unsplash.jpg')})`,
    backgroundSize:'cover',
  },
  content: {
    paddingLeft: theme.spacing(5),
    paddingRight:  theme.spacing(5),
    paddingBottom: theme.spacing(3)
  },
  filter: {
    width: 325,
  },
  tabs: {
    fontSize: 26,
  },
  pagination: {
    background: theme.palette.secondary.main,
    borderRadius: 5,
    opacity: 0.85
  },
  table: {
    background: theme.palette.primary.white,
    width: '70vw'
  }
}))

const Home = props => {
  const classes= useStyles()
  const {loading, error, payload } = props
  const {pagination,loadPage} = props
  const {jobs, pages,currentPage} = payload
  const [value, setValue] = useState(0)
  const { t, i18n } = useTranslation()
  useEffect(() => {
    loadPage()
  },[])

  const handleTabsChanged = (event, newValue) => {
    setValue(newValue);
  }
  const handlePagination = (event, offset) => {
    const perPage = 10

    const page = offset / perPage + 1
    console.log(page)
    pagination(page)
  }

  if(loading){
    return <span>Loading...</span>
  } else if(error){
    return <span>Error:{error}</span>
  } else {
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <Appbar/>
          <Box display='flex' flexDirection='column'>
            <Box dispaly='flex' height={contentTop} />
            <Box display='flex'>
              <Paper >
                <Tabs className={classes.filter} value={value} onChange={handleTabsChanged} textColor='primary' >
                  <Tab className={classes.tabs} label='薪資最高' />
                  <Tab className={classes.tabs} label='最適合你' />
                </Tabs>
              </Paper>
              <Box width='40%'/>
            </Box>
            <Box Box display='flex'>
              <Paper className={classes.table}>
                <Table jobs={jobs}/>
              </Paper>
            </Box>
            <Box display='flex' justifyContent='center' mt={3}>
              <Pagination
                className={classes.pagination}
                reduced
                size='large'
                limit={10}
                offset={(currentPage === 1)? 0: (currentPage - 1) * 10}
                total={pages}
                onClick={handlePagination}
              />
            </Box>
          </Box>
        </div>
      </div>
    )
  }

}

export default connect(
  (state, props) => ({
    loading: state.homePage.loading,
    error: state.homePage.error,
    payload: state.homePage.payload
  }),
  (dispatch) => ({
    loadPage: () => dispatch(actions.loadHomePage()),
    pagination: (page) => dispatch(actions.pagination(page))
  })
)(Home)
