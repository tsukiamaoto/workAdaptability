
const fetchResume = async action => {
  const resumeId = action.payload.resume
  const url = `/resume/${resumeId}`
  const res = await fetch( url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await res.json()
  return json
}

const updateResume = async action => {
  const url = '/resume/upload'
  const {autobiography, license,user} = action.payload
  var fd = new FormData()
  fd.append('user',user)
  fd.append('autobiography', autobiography)
  fd.append('license', license)

  const res = await fetch( url, {
    method: 'POST',
    body: fd
  })
  const json = await res.json()
  return json
}

export {
  updateResume,
  fetchResume
}
