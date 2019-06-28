import React, { useState, useEffect } from  'react'
import { makeStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import * as actions from '../../actions'
import Appbar from '../Common/Appbar'
import Table from './Table'
import ListJobs from '../Common/ListJobs'
import Pagination from 'material-ui-flat-pagination'
// import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import queryString from 'query-string'

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
  const {loading, error, payload, loadPage, logout, history, queryJob, user, resume } = props
  const {jobs, pages} = payload
  const [tabs, setTabs] = useState(0)
  const [isLoad, setIsLoad] = useState(false)
  const [query, setQuery] = useState('')
  // const { t, i18n } = useTranslation()
  useEffect(() => {
    props.loadUser()
  },[props.isLogin,])

  useEffect(() => {
    if(props.isLogin && loading) props.loadResume(user)
  },)

  useEffect(() => {
    const page = queryString.parse(history.location.search).page
    if(tabs === 0 && query) setQuery('')
    else if(tabs === 1) setQuery(resume.recommend_jobs)
    if(query && query.length)
      queryJob({q: query,page: page})
    else
      loadPage(page)
    setIsLoad(false)
  },[isLoad,query,tabs])

  function handleTabsChanged (event, tab){
    setTabs(tab);
  }
  function handlePagination (event, offset){
    const perPage = 10

    const page = offset / perPage + 1
    history.push(`/home/?page=${page}`)
    setIsLoad(true)
  }
  function handleLogout (){
    logout(user)
  }
  function handleQuery(value) {
    setTabs(0)
    setQuery(value)
  }


  if(loading){
    return <span>Loading...</span>
  } else if(error){
    return <span>Error:{error}</span>
  } else {
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <Appbar queryJob={handleQuery} logout={handleLogout}/>
          <Box display='flex' flexDirection='column'>
            <Box dispaly='flex' height={contentTop} />
            <Box display='flex'>
              <Paper>
                <Tabs className={classes.filter} value={tabs} onChange={handleTabsChanged} textColor='primary' >
                  <Tab className={classes.tabs} label='工作列表' />
                  <Tab className={classes.tabs} label='最適合你' />
                </Tabs>
              </Paper>
              <Box width='40%'/>
            </Box>
            <Box display='flex'>
              <Paper className={classes.table}>
                <Table jobs={jobs}/>
              </Paper>
              <Box width='5%'/>
              <Box width='20%' display='flex' alignSelf='flex-start'>
                { resume && resume.recommend_jobs && <ListJobs title="職業推薦" recommends={resume.recommend_jobs} switch={true} /> }
                <Box width='10%'/>
              </Box>
            </Box>
            <Box display='flex' justifyContent='center' mt={3}>
              <Pagination
                className={classes.pagination}
                reduced
                size='large'
                limit={10}
                offset={(pages.current === 1)? 0: (pages.current - 1) * 10}
                total={pages.last}
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
    isLogin: state.account.fetch.isLogin,
    loginError: state.account.fetch.error,
    user: state.account.fetch.user,
    loading: state.homePage.loading,
    error: state.homePage.error,
    payload: state.homePage.payload,
    resume: state.resume.payload
  }),
  (dispatch) => ({
    loadPage: (payload) => dispatch(actions.loadHomePage(payload)),
    loadUser: () => dispatch(actions.fetchUser()),
    loadResume: (user) => dispatch(actions.fetchResume(user)),
    logout: (user) => dispatch(actions.logout(user)),
    queryJob: (payload) => dispatch(actions.queryJob(payload))
  })
)(Home)
