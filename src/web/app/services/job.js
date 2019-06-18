const fetchAllJobs = async () => {
  const url = '/job'
  const res = await fetch( url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await res.json()
  return json
}

const fetchPageJob = async page => {
  const url = `/job/${page}`
  const res = await fetch( url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await res.json()
  return json
}

const queryJob = payload => {
  const query = payload.q
  const url = '/job'
  return fetch( url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      q: query
    })
  }).then(response => response.json())
}

export {
  fetchAllJobs,
  fetchPageJob,
  queryJob
}
