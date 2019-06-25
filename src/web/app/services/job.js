
const fetchJobs = async payload => {
  const url = (payload === undefined)? '/job': `/job?page=${payload}`
  const res = await fetch( url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await res.json()
  return json
}

const queryJob = async payload => {
  const {q, page} = payload
  const url = (page === undefined)? '/job': `/job?page=${page}`
  const res = await fetch( url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      q
    })
  })
  const json = await res.json()
  return json
}

export {
  fetchJobs,
  queryJob
}
