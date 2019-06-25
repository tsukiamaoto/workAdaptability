const fetchResume = async () => {
  const url = '/resume'
  const res = await fetch( url, {
    method: 'GET',
  })
  const json = await res.json()
  return json
}

const updateResume = async action => {
  const url = '/resume/upload'
  const {autobiography, license} = action.payload
  console.log(action.payload)
  var fd = new FormData()
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
