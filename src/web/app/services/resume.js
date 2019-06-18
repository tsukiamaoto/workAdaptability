
const get = async () => {
  const url = '/resume'
  const res = await fetch( url, {
    method: 'GET',
  })
  // const json = await res.json()
  console.log(res)
  return res
}

const update = async action => {
  const url = '/resume/update'
  const file = action.payload
  var fd = new FormData()
  fd.append('file', file)

  const res = await fetch( url, {
    method: 'POST',
    body: fd
  })
  const json = await res.json()
  console.log(json)
  return json
}

export {
  update,
  get
}
