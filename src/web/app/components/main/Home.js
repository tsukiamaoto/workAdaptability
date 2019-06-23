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
import queryString from 'query-string';

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
  const {loading, error, payload,loadPage, history, queryJob } = props
  const {jobs, pages} = payload
  const [value, setValue] = useState(0)
  const [isLoad, setIsLoad] = useState(false)
  const [state, setState] = useState()
  const [query, setQuery] = useState('')
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const page = queryString.parse(history.location.search).page
    if(query && query.length)
      queryJob({q: query,page: page})
    else
      loadPage(page)
    setIsLoad(false)
  },[isLoad,query])

  const handleTabsChanged = (event, newValue) => {
    setValue(newValue);
  }
  const handlePagination = (event, offset) => {
    const perPage = 10

    const page = offset / perPage + 1
    history.push(`?page=${page}`)
    setIsLoad(true)
  }

  if(loading){
    return <span>Loading...</span>
  } else if(error){
    return <span>Error:{error}</span>
  } else {
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <Appbar queryJob={setQuery}/>
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
                offset={(pages.current === 1)? 0: (pages.current - 1) * 10}
                total={pages.total}
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
    loadPage: (payload) => dispatch(actions.loadHomePage(payload)),
    queryJob: (payload) => dispatch(actions.queryJob(payload))
  })
)(Home)
