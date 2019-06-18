const login = payload => {
  const url = '/user/login'
  return fetch( url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...payload
    })
  }).then(response => response.json())
}

const register = payload => {
  const url = '/user/register'
  return fetch( url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...payload
    })
  }).then(response => response.json())
}

export {
  login,
  register
}
