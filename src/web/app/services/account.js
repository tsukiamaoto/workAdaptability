
const fetchUser = async () => {
  const url = '/user'
  const res = await fetch( url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await res.json()
  return json
}

const login = async payload => {
  const url = '/user/login'
  const res = await fetch( url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...payload
    })
  })
  const json = await res.json()
  return json
}

const logout = async payload => {
  const url = '/user/logout'
  const res = await fetch( url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...payload
    })
  })
  const json = await res.json()
  return json
}

const register = async payload => {
  const url = '/user/register'
  const res = await fetch( url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...payload
    })
  })
  const json = await res.json()
  return json
}

export {
  fetchUser,
  login,
  logout,
  register
}
